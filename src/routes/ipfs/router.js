import express from 'express';
import { ipfsService } from '../../services/ipfs/route-service';

const router = express.Router();

router.get('/upload', async (req, res) => {
  const response = await ipfsService.upload();
  res.send(response);
});

router.get('/download', (req, res) => {
  res.send(ipfsService.download());
});

export default router;
