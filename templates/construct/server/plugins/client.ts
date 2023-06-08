import fastifyStatic from '@fastify/static'
import { definePlugin } from '@michealpearce/classy-fastify'
import { resolveRootPath } from 'server/includes/functions'

export const clientPlugin = definePlugin(async instance => {
	await instance.register(fastifyStatic, {
		root: resolveRootPath('dist/client'),
		wildcard: false,
	})

	instance.get('*', (_request, reply) => {
		return reply.sendFile('index.html')
	})
})
