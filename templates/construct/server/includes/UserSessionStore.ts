import type { SessionStore } from '@fastify/session'
import type { Session } from 'fastify'
import { UserSession } from 'server/database/models/UserSession'

export class UserSessionStore implements SessionStore {
	set(id: string, session: Session, callback: (err?: any) => void): void {
		UserSession.save({
			id,
			userName: session.userName,
			data: session,
		}).then(() => callback(), callback)
	}

	get(
		id: string,
		callback: (err: any, result?: Session | null | undefined) => void,
	): void {
		UserSession.findOneBy({ id }).then(
			session => callback(null, session?.data),
			callback,
		)
	}

	destroy(id: string, callback: (err?: any) => void): void {
		UserSession.delete({ id }).then(() => callback(), callback)
	}
}
