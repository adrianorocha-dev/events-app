import { t } from './trpcInstance'

import { institutionsRoutes } from './modules/institutions/routes'
import { participantsRoutes } from './modules/participants/routes'
import { usersRoutes } from './modules/users/routes'
import { eventsRoutes } from './modules/events/routes'

export const appRouter = t.router({
  institutions: institutionsRoutes,
  participants: participantsRoutes,
  users: usersRoutes,
  events: eventsRoutes,
})

export type AppRouter = typeof appRouter