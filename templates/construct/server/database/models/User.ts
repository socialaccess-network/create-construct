import { Model, type ModelData } from '@michealpearce/typeorm-models'
import { Column, Entity } from 'typeorm'

export interface UserData extends ModelData {
	name: string
	password?: string
}

@Entity()
export class User extends Model<UserData> implements UserData {
	@Column('varchar', { length: 255, primary: true })
	declare name: string

	@Column('varchar', { select: false })
	declare password: string
}

export const model = User
