import type { ClientContext } from 'client/types'
import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

type NavigationGuardReturn = void | Error | RouteLocationRaw | boolean
export type MiddlewareHandler = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	context: ClientContext,
) => NavigationGuardReturn | Promise<NavigationGuardReturn>

export function defineMiddleware(handler: MiddlewareHandler) {
	return handler
}
