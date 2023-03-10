import FastiFy from 'fastify'
import { appRoutes } from './routes';
import cors from '@fastify/cors';

const PORT = +(process.env.PORT ?? '3333');
const app = FastiFy()

app.register(cors);
app.register(appRoutes);

app.listen({
  port: PORT,
  host: '0.0.0.0',
}).then(() => {
  console.log('HTTP server is running')
});