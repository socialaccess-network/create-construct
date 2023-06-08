import { useContext } from 'client/includes/functions'
import type { ClientContext } from 'client/types'
import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import { useAuth } from '../stores/auth'

declare module 'client/types' {
	interface ClientContext {
		api: AxiosInstance
	}
}

export async function setupAPI(context: ClientContext) {
	const api = axios.create({
		baseURL: '/api',
	})

	context.api = api
	context.app.provide('api', api)

	const loggedIn = localStorage.getItem('loggedIn')
	if (loggedIn) {
		const auth = useAuth(context)
		await auth.fetch().catch(() => localStorage.removeItem('loggedIn'))
	}
}

export function useAPI(context: ClientContext = useContext()) {
	return context.api
}
