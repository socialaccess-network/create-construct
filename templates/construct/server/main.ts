import fastify from 'fastify'
import { apiPlugin } from 'server/plugins/api'
import { clientPlugin } from 'server/plugins/client'
import { databasePlugin } from 'server/plugins/database'

const app = fastify({
	ignoreDuplicateSlashes: true,
	logger: {
		level: import.meta.env.DEV ? 'debug' : undefined,
		transport: import.meta.env.DEV
			? {
					target: 'pino-pretty',
			  }
			: undefined,
	},
	ignoreTrailingSlash: true,
})

async function main() {
	await app.register(databasePlugin).register(apiPlugin).register(clientPlugin)

	const serverURL = new URL(
		import.meta.env.SERVER_URL ?? 'http://localhost:3001',
	)

	await app.listen({
		port: Number(serverURL.port),
	})

	app.log.debug(
		app.printRoutes({
			commonPrefix: false,
			includeHooks: true,
			includeMeta: true,
		}),
		'Routes:',
	)

	// Current implementation of construct cli does fully stop the process due to hmr being enabled so need to close the server manually on full reload
	import.meta.hot?.on('vite:beforeFullReload', () => app.close())
}

main()
