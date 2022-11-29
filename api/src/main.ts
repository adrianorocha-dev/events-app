import fastify from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { appRouter } from './router';
import { createContext } from './context';

const app = fastify({
  maxParamLength: 5000
})

app.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext }
})


const startServer = async () => {
  try {
    const address = await app.listen({
      host: '0.0.0.0',
      port: Number(process.env.PORT ?? 3333)
    });

    console.log('Application running at:', address)
  } catch(error) {
    console.error(error);
    process.exit()
  }
}

startServer()