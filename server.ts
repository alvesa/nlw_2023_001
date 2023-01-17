import FastiFy from 'fastify'
import { PrismaClient}  from '@prisma/client'

const app = FastiFy()
const prisma = new PrismaClient()

app.get('/hello', async () => {
  const habits = await prisma.habit.findMany()

  return habits;
})

app.listen({
  port: 3333
}).then(() => {
  console.log('HTTP server is running')
});