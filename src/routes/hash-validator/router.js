import express from 'express';
import crypto from 'crypto';
import logger from '../../config/winston';

const router = express.Router();

router.post('/hash-validator/checksum/:fileId', (req, res) => {
  const { fileId } = req.params;
  const hmac = crypto.createHmac('md5', fileId);
  req.on('error', (error) => {
    logger.error(error);
    res.status(400).send('Error hashing file, please check logs.');
  });
  req.on('data', (chunk) => {
    hmac.update(chunk);
  });
  req.on('end', () => {
    const fileChecksum = hmac.digest('hex');
    logger.debug(`File checksum: ${fileChecksum}`);
    res.status(201).send(fileChecksum);
  });
});

export default router;
