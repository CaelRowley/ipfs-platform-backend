import fs from 'fs';
import { ipfs } from './ipfs';
import logger from '../../config/winston';

export const ipfsService = {};

const tempFile = fs.readFileSync(`${__dirname}/temp.txt`);
const tempBuffer = Buffer.from(tempFile);

ipfsService.upload = () => {
  ipfs.add(tempBuffer, (err, response) => {
    if (err) {
      logger.debug(err);
    }
    logger.debug(response[response.length - 1].hash);
  });
};

ipfsService.download = () => {
  const validCID = 'QmXmD7akGKCN8Jiniw15j81PqWMCxjxGhDE6Lok5nx7Mcc';

  ipfs.get(validCID, (err, files) => {
    files.forEach((file) => {
      logger.debug(file.path);
      logger.debug(file.content.toString('utf8'));
    });
  });
};

export default {
  ipfsService,
};
