export type * from 'server/exports'
import type { App } from 'vue'

export interface ClientState extends Record<string, any> {}

export interface ClientContext {
	app: App
	state: ClientState
}
