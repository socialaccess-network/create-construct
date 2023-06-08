import { inject, unref, type UnwrapRef } from 'vue'
import type { ClientContext } from '../types'

export function useContext() {
	return inject('context') as ClientContext
}

export type StoreDefinition<State = any> = (context: ClientContext) => State

export function defineStore<State>(
	namespace: string,
	definition: StoreDefinition<State>,
) {
	return function useStore(context = useContext()): UnwrapRef<State> {
		if (!context.state[namespace])
			context.state[namespace] = unref(definition(context))

		return context.state[namespace]
	}
}
