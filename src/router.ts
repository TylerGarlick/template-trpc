import * as trpc from '@trpc/server'
import { z } from 'zod'

const VERSION = `1.0.0`

export interface AccountRegisterResponse {
  id: string
}

export const appRouter = trpc
  .router()
  .query('version', {
    async resolve() {
      return VERSION
    },
  })
  .mutation('accounts.register', {
    input: z.object({
      username: z.string(),
      password: z.string(),
      email: z.string(),
    }),
    resolve: (): Promise<AccountRegisterResponse> => {
      return Promise.resolve(({
        id: ``,
      } as unknown) as AccountRegisterResponse)
    },
  })

export type AppRouter = typeof appRouter
