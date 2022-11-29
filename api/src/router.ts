import { t } from './trpcInstance'

import { institutionsRoutes } from './modules/institutions/routes'
import { participantsRoutes } from './modules/participants/routes'
import { usersRoutes } from './modules/users/routes'

export const appRouter = t.router({
  institutions: institutionsRoutes,
  participants: participantsRoutes,
  users: usersRoutes,
})

export type AppRouter = typeof appRouter