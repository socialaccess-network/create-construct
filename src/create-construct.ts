import minimist from 'minimist'
import path from 'node:path'
import fs from 'node:fs'
import {
	copy,
	emptyDir,
	formatTargetDir,
	getPrompts,
	pkgFromUserAgent,
} from './functions'
import { FRAMEWORKS } from './frameworks'
import spawn from 'cross-spawn'
import { fileURLToPath } from 'node:url'

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string.
// copied from create-vite, see https://github.com/vitejs/vite/pull/4606
const argv = minimist<{
	t?: string
	template?: string
}>(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

const renameFiles: Record<string, string | undefined> = {
	_gitignore: '.gitignore',
	_prettierrc: '.prettierrc',
	'_yarnrc.yml': '.yarnrc.yml',
	_env: '.env',
}

const defaultTargetDir = 'construct-project'

async function init() {
	const argTargetDir = formatTargetDir(argv._[0])
	const argTemplate = argv.template || argv.t

	let targetDir = argTargetDir || defaultTargetDir

	const getProjectName = () =>
		targetDir === '.' ? path.basename(path.resolve()) : targetDir

	const result = await getPrompts(
		targetDir,
		argTargetDir,
		argTemplate,
		defaultTargetDir,
		getProjectName,
	)

	// user choice associated with prompts
	const { framework, overwrite, packageName, variant } = result

	const root = path.join(cwd, targetDir)

	if (overwrite) {
		emptyDir(root)
	} else if (!fs.existsSync(root)) {
		fs.mkdirSync(root, { recursive: true })
	}

	// determine template
	let template: string = variant || framework?.name || argTemplate

	const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
	const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
	const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

	const { customCommand } =
		FRAMEWORKS.flatMap(f => f.variants).find(v => v.name === template) ?? {}

	if (customCommand) {
		const fullCustomCommand = customCommand
			.replace(/^npm create/, `${pkgManager} create`)
			// Only Yarn 1.x doesn't support `@version` in the `create` command
			.replace('@latest', () => (isYarn1 ? '' : '@latest'))
			.replace(/^npm exec/, () => {
				// Prefer `pnpm dlx` or `yarn dlx`
				if (pkgManager === 'pnpm') {
					return 'pnpm dlx'
				}
				if (pkgManager === 'yarn' && !isYarn1) {
					return 'yarn dlx'
				}
				// Use `npm exec` in all other cases,
				// including Yarn 1.x and other custom npm clients.
				return 'npm exec'
			})

		const [command, ...args] = fullCustomCommand.split(' ')
		// we replace TARGET_DIR here because targetDir may include a space
		const replacedArgs = args.map(arg => arg.replace('TARGET_DIR', targetDir))
		const { status } = spawn.sync(command, replacedArgs, {
			stdio: 'inherit',
		})
		process.exit(status ?? 0)
	}

	console.log(`\nScaffolding project in ${root}...`)

	const templateDir = path.resolve(
		fileURLToPath(import.meta.url),
		'../..',
		`templates/${template}`,
	)

	const write = (file: string, content?: string) => {
		const targetPath = path.join(root, renameFiles[file] ?? file)
		if (content) {
			fs.writeFileSync(targetPath, content)
		} else {
			copy(path.join(templateDir, file), targetPath)
		}
	}

	const files = fs.readdirSync(templateDir)
	for (const file of files.filter(f => f !== 'package.json')) {
		write(file)
	}

	const pkgName = packageName || getProjectName()
	const updatePkgName = (input: string) =>
		input.replace(/\$\{pkgName\}/g, pkgName)

	const pkg = fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
	const readme = fs.readFileSync(path.join(templateDir, 'README.md'), 'utf-8')
	const vscodeWorkspace = fs.readFileSync(
		path.join(templateDir, 'construct.code-workspace'),
		'utf-8',
	)

	write('package.json', updatePkgName(pkg))
	write('README.md', updatePkgName(readme))
	write('construct.code-workspace', updatePkgName(vscodeWorkspace))

	const cdProjectName = path.relative(cwd, root)
	console.log(`\nDone. Now run:\n`)
	if (root !== cwd) {
		console.log(
			`  cd ${
				cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
			}`,
		)
	}
	switch (pkgManager) {
		case 'yarn':
			console.log('  yarn')
			console.log('  yarn dev')
			break
		default:
			console.log(`  ${pkgManager} install`)
			console.log(`  ${pkgManager} run dev`)
			break
	}
	console.log()
}

init().catch(err => {
	console.error(err)
	process.exit(1)
})
