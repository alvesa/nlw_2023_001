import FastiFy from 'fastify'
import { PrismaClient } from '@prisma/client'

const PORT = +(process.env.PORT ?? '3333');

const app = FastiFy()
const prisma = new PrismaClient()

app.get('/hello', async () => {
  const habits = await prisma.habit.findMany()

  return habits;
})

app.listen({
  port: PORT
}).then(() => {
  console.log('HTTP server is running')
});