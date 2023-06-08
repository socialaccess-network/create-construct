<script lang="ts">
import { isString, noop } from '@michealpearce/utils'
import { useAuth } from 'client/stores/auth'
import { computed, defineComponent, onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const creds = reactive({
	username: '',
	password: '',
})

const redirect = computed(() =>
	isString(route.query.redirect) ? route.query.redirect : undefined,
)

async function login() {
	try {
		await auth.login(creds)
		router.push(redirect.value || '/')
	} catch (error) {
		console.error(error)
	}
}

onBeforeMount(() => {
	const logout = route.query.logout as string | undefined
	if (logout) {
		return auth
			.logout()
			.catch(noop)
			.finally(() => {
				window.location.href = '/login'
			})
	}

	if (auth.isLoggedIn) return router.push(redirect.value || '/')
})
</script>

<template>
	<ConstructPage class="login-page">
		<h1>Construct</h1>

		<form @submit.prevent="login">
			<ConstructInput
				v-model="creds.username"
				id="username"
				label="Username"
			/>

			<ConstructInput
				v-model="creds.password"
				id="password"
				label="Password"
				:options="{
					type: 'password',
				}"
			/>

			<ConstructButton type="submit">Login</ConstructButton>
			<ConstructLink to="/">Home</ConstructLink>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.login-page {
	@include flex(column, center, center);

	h1 {
		margin-bottom: 1em;
	}

	form {
		@include flex(column, center, stretch);
		row-gap: 1em;
	}
}
</style>

<route lang="yaml">
meta:
  layout: no-layout
</route>
