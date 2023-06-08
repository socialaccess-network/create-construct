import { DataSource } from 'typeorm'
import { definePlugin } from '@michealpearce/classy-fastify'
import { isDefined, type ClassType } from '@michealpearce/utils'
import type { BaseModel } from '@michealpearce/typeorm-models'
import { hashPassword, resolveBinPath } from 'server/includes/functions'
import { User } from 'server/database/models/User'

declare module 'fastify' {
	interface FastifyInstance {
		database: DataSource
	}
}

function getModels(): Array<ClassType<BaseModel<any>>> {
	const files = import.meta.glob<true, string, Record<string, any>>(
		'../database/models/**/*.ts',
		{
			eager: true,
		},
	)

	return Object.values(files)
		.map(file => file.model)
		.filter(isDefined)
}

export const databasePlugin = definePlugin(
	async instance => {
		const entities = getModels()
		const entityNames = entities.map(entity => entity.name)

		const source = new DataSource({
			type: 'sqlite',
			database: resolveBinPath('database.sqlite'),
			entities,
			synchronize: import.meta.env.DEV,
		})

		instance.log.info({ entities: entityNames }, 'Initializing database')

		try {
			await source.initialize()
		} catch (error) {
			instance.log.error(error, 'Failed to initialize database')
			throw error
		}

		instance.log.info('Database initialized')
		instance.decorate('database', source)

		// await User.init({
		// 	name: 'admin',
		// 	password: await hashPassword('admin'),
		// }).save()
	},
	{
		global: true,
		name: 'database',
	},
)
