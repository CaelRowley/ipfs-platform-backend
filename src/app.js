import express from 'express';
import http from 'http';
import logger from './config/winston';
import { addRouters } from './routes/app-router';

const app = express();
const server = http.createServer(app);

addRouters(app);

server.listen(process.env.PORT, () => {
  logger.debug(`Server be jammin' on port ${process.env.PORT}!`);
});

export default app;
