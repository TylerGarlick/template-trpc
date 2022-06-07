import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { createContext } from './context'
import { appRouter } from './router'

// const server = fastify({
//   maxParamLength: 5000,
// })

// server.register(require('fastify-express'))

// server.register(fastifyTRPCPlugin, {
//   prefix: '/trpc',
//   trpcOptions: { router: appRouter, createContext },
// })

// ;(async () => {
//   try {
//     await server.listen(5000, (err, address) => {
//       if (err) {
//         console.error(err)
//         process.exit(1)
//       }
//       console.log(`Server listening on ${address}`)
//     })
//   } catch (err) {
//     server.log.error(err)
//     process.exit(1)
//   }
// })()

const runApp = async () => {
  const app = express()

  const trpcApiEndpoint = '/api/trpc'
  const playgroundEndpoint = '/playground'

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    }),
  )

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
      // uncomment this if you're using superjson
      // request: {
      //   superjson: true,
      // },
    }),
  )

  app.listen(3000, () => {
    console.log('listening at http://localhost:3000')
  })
}

runApp()
