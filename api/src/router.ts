import { t } from './trpcInstance'
import { institutionsRoutes } from './modules/institutions/routes'
import { participantsRoutes } from './modules/participants/routes'

export const appRouter = t.router({
  institutions: institutionsRoutes,
  participants: participantsRoutes,
})

export type AppRouter = typeof appRouter