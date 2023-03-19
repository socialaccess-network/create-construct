import { red, reset } from 'kolorist'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { TEMPLATES, FRAMEWORKS } from './frameworks'
import { Framework } from './types'

export function formatTargetDir(targetDir: string | undefined) {
	return targetDir?.trim().replace(/\/+$/g, '')
}

export function copy(src: string, dest: string) {
	const stat = fs.statSync(src)
	if (stat.isDirectory()) {
		copyDir(src, dest)
	} else {
		fs.copyFileSync(src, dest)
	}
}

export function isValidPackageName(projectName: string) {
	return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
		projectName,
	)
}

export function toValidPackageName(projectName: string) {
	return projectName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/^[._]/, '')
		.replace(/[^a-z\d\-~]+/g, '-')
}

export function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true })
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file)
		const destFile = path.resolve(destDir, file)
		copy(srcFile, destFile)
	}
}

export function isEmpty(path: string) {
	const files = fs.readdirSync(path)
	return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir: string) {
	if (!fs.existsSync(dir)) {
		return
	}
	for (const file of fs.readdirSync(dir)) {
		if (file === '.git') {
			continue
		}
		fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
	}
}

export function pkgFromUserAgent(userAgent: string | undefined) {
	if (!userAgent) return undefined
	const pkgSpec = userAgent.split(' ')[0]
	const pkgSpecArr = pkgSpec.split('/')
	return {
		name: pkgSpecArr[0],
		version: pkgSpecArr[1],
	}
}

export function getPrompts(
	targetDir: string,
	argTargetDir: string | undefined,
	argTemplate: string | undefined,
	defaultTargetDir: string,
	getProjectName: () => string,
): Promise<
	prompts.Answers<
		'projectName' | 'overwrite' | 'packageName' | 'framework' | 'variant'
	>
> {
	return prompts(
		[
			{
				type: argTargetDir ? null : 'text',
				name: 'projectName',
				message: reset('Project name:'),
				initial: defaultTargetDir,
				onState: state => {
					targetDir = formatTargetDir(state.value) || defaultTargetDir
				},
			},
			{
				type: () =>
					!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
				name: 'overwrite',
				message: () =>
					(targetDir === '.'
						? 'Current directory'
						: `Target directory "${targetDir}"`) +
					` is not empty. Remove existing files and continue?`,
			},
			{
				type: (_, { overwrite }: { overwrite?: boolean }) => {
					if (overwrite === false) {
						throw new Error(red('✖') + ' Operation cancelled')
					}
					return null
				},
				name: 'overwriteChecker',
				message: '',
			},
			{
				type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
				name: 'packageName',
				message: reset('Package name:'),
				initial: () => toValidPackageName(getProjectName()),
				validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
			},
			{
				type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
				name: 'framework',
				message:
					typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
						? reset(
								`"${argTemplate}" isn't a valid template. Please choose from below: `,
						  )
						: reset('Select a framework:'),
				initial: 0,
				choices: FRAMEWORKS.map(framework => {
					const frameworkColor = framework.color
					return {
						title: frameworkColor(framework.display || framework.name),
						value: framework,
					}
				}),
			},
			{
				type: (framework: Framework) =>
					framework && framework.variants ? 'select' : null,
				name: 'variant',
				message: reset('Select a variant:'),
				choices: (framework: Framework) =>
					framework.variants.map(variant => {
						const variantColor = variant.color
						return {
							title: variantColor(variant.display || variant.name),
							value: variant.name,
						}
					}),
			},
		],
		{
			onCancel: () => {
				throw new Error(red('✖') + ' Operation cancelled')
			},
		},
	)
}
