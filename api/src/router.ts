import { t } from './trpcInstance'
import { institutionsRoutes } from './modules/institutions/routes'

export const appRouter = t.router({
  institutions: institutionsRoutes,
})

export type AppRouter = typeof appRouter