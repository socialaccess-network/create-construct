import type { User } from 'server/database/models/User'

declare module 'fastify' {
	interface FastifyRequest {
		authed?: User
	}

	interface Session {
		userName: string
	}
}
