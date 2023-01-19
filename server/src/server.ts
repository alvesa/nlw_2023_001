import FastiFy from 'fastify'
import { appRoutes } from './routes';

const PORT = +(process.env.PORT ?? '3333');
const app = FastiFy()

app.register(appRoutes);

app.listen({
  port: PORT
}).then(() => {
  console.log('HTTP server is running')
});