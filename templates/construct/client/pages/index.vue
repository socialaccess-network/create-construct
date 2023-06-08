<script lang="ts">
import { useAuth } from 'client/stores/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'IndexPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
</script>

<template>
	<ConstructPage class="index-page">
		<div v-if="auth.isLoggedIn">
			<h1>Logged In</h1>
			<ConstructLink to="/login?logout=true">Logout</ConstructLink>
		</div>
		<div v-else>
			<h1>Not Logged In</h1>
			<ConstructLink to="/login">Login</ConstructLink>
		</div>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.index-page {
}
</style>
