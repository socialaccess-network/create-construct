import { compare, hash } from 'bcrypt'
import { resolve } from 'path'

const pSalt = import.meta.env.SERVER_PASSWORD_SALT || 'construct'
const pRounds = import.meta.env.SERVER_PASSWORD_SALT_ROUNDS || 10

export function resolveRootPath(path: string) {
	return resolve(__ROOT__, path)
}

export function resolveBinPath(path: string) {
	return resolve(__BIN__, path)
}

export function hashPassword(input: string) {
	const data = `${pSalt}${input}`

	return hash(data, pRounds)
}

export function comparePassword(input: string, encrypted: string) {
	const data = `${pSalt}${input}`
	return compare(data, encrypted)
}
