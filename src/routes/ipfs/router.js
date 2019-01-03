import express from 'express';
import { ipfsService } from '../../services/ipfs/route-service';

const router = express.Router();

router.get('/upload', (req, res) => {
  res.send(ipfsService.upload());
});

router.get('/download', (req, res) => {
  res.send(ipfsService.download());
});

export default router;
