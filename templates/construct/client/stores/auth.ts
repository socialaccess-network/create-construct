import { defineStore } from 'client/includes/functions'
import type { LoginCreds, UserData } from 'client/types'
import { computed, ref } from 'vue'

export const useAuth = defineStore('auth', ({ api }) => {
	const current = ref<UserData | null>(null)

	const isLoggedIn = computed(() => current.value !== null)

	async function fetch() {
		const { data } = await api.get<UserData>('auth')

		current.value = data
		return data
	}

	async function login(creds: LoginCreds) {
		const { data: user } = await api.post<UserData>('auth', creds)

		localStorage.setItem('loggedIn', 'true')
		current.value = user
	}

	async function logout() {
		current.value = null
		localStorage.removeItem('loggedIn')
		await api.delete('auth')
	}

	return {
		current,
		isLoggedIn,
		fetch,
		login,
		logout,
	}
})
