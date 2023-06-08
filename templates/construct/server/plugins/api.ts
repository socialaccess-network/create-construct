import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifySession from '@fastify/session'
import { definePlugin } from '@michealpearce/classy-fastify'
import { isDefined, type FunctionType } from '@michealpearce/utils'
import { User } from 'server/database/models/User'
import { UserSessionStore } from 'server/includes/UserSessionStore'

declare module 'fastify' {
	interface FastifyRequest {
		authed?: User
	}

	interface Session {
		userID: number
	}
}

function getRoutes(): Array<FunctionType> {
	const files = import.meta.glob<true, string, Record<string, any>>(
		'../api/**/*.route.ts',
		{
			eager: true,
		},
	)

	return Object.values(files)
		.map(file => file.route)
		.filter(isDefined)
}

export const apiPlugin = definePlugin(
	async instance => {
		await instance
			.register(fastifyCors, {
				origin: import.meta.env.CLIENT_URL,
			})
			.register(fastifyCookie)
			.register(fastifySession, {
				secret: import.meta.env.SERVER_SESSION_SECRET,
				cookieName: 'construct-session',
				store: new UserSessionStore(),
				saveUninitialized: false,
				cookie: {
					secure: import.meta.env.PROD,
					httpOnly: true,
				},
			})

		// instance.addHook('onRequest', async request => {
		// 	const userName = request.session.get('userName')
		// 	if (!userName) return

		// 	request.log.info(`authing user ${userName}`)
		// 	request.authed = await User.findOneByOrFail({ name: userName })
		// 	request.log.info(`user ${userName} is authenticated`)
		// })

		for (const route of getRoutes())
			await instance.register(route, {
				prefix: '/api',
			})
	},
	{
		global: true,
		name: 'api',
	},
)
