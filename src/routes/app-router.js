import healthcheckRouter from './healthcheck/router';
import ipfsRouter from './ipfs/router';

export const addRouters = (app) => {
  app.use(healthcheckRouter);
  app.use(ipfsRouter);
};

export default {
  addRouters,
};
