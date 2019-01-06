import express from 'express';
import { ipfsService } from '../../services/ipfs/route-service';
import logger from '../../config/winston';

const router = express.Router();

router.get('/upload', async (req, res) => {
  try {
    const response = await ipfsService.upload();
    res.status(201).send(response);
  } catch (error) {
    logger.error(error);
    res.status(400).send('Error uploading file, please check logs.');
  }
});

router.get('/download', (req, res) => {
  res.send(ipfsService.download());
});

export default router;
