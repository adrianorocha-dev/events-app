import fastify from "fastify";

const app = fastify()

app.get('/', (request, reply) => {
  return {
    message: 'Hello World'
  }
})

const startServer = async () => {
  try {
    const address = await app.listen({port: Number(process.env.PORT ?? 3333)});

    console.log('Application running at:', address)
  } catch(error) {
    console.error(error);
    process.exit()
  }
}

startServer()