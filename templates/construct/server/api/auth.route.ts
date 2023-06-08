import { Endpoint, defineRoute } from '@michealpearce/classy-fastify'
import { User } from '../database/models/User'
import { ServerError } from 'server/includes/ServerError'
import { comparePassword } from 'server/includes/functions'
import { isAuthed } from 'server/middleware/isAuthed'

export type LoginCreds = {
	username: string
	password: string
}

export const route = defineRoute('/auth')

@route.endpoint('GET')
export class AuthGETEndpoint extends Endpoint {
	static onRequest = [isAuthed]

	handle() {
		return this.request.authed!
	}
}

@route.endpoint('POST')
export class AuthLoginEndpoint extends Endpoint<{
	body: LoginCreds
}> {
	async handle() {
		console.log('hello')
		this.console.info(this.request.body)
		const { username, password } = this.request.body

		const user = await User.findOne({
			where: { name: username },
			select: {
				name: true,
				password: true,
			},
		})
		if (!user || !user.password) {
			this.console.info('Invalid username or password')
			throw new ServerError('Invalid username or password', 401)
		}

		const valid = await comparePassword(password, user.password)
		if (!valid) throw new ServerError('Invalid username or password', 401)

		this.request.session.set('userName', user.name)
		await this.request.session.save()
		const fullUser = await User.findOneByOrFail({ name: user.name })

		return {
			sessionID: this.request.session.encryptedSessionId,
			user: fullUser,
		}
	}
}

@route.endpoint('DELETE')
export class AuthLogoutEndpoint extends Endpoint {
	static onRequest = [isAuthed]

	async handle() {
		await this.request.session.destroy()
		return { success: true }
	}
}
