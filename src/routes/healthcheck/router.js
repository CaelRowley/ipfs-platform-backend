import express from 'express';
import { healthcheck } from '../../services/healthcheck/route-service';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(healthcheck());
});

export default router;
