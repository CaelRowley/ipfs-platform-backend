/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import request from 'axiosist';
import crypto from 'crypto';
import fs from 'fs';
import appRoot from 'app-root-path';
import app from '../../../src/app';
import logger from '../../../src/config/winston';

const should = chai.should();

const smallFile = 'small.pdf';
const largeFile = 'large.pdf';

const getFileChecksum = file => new Promise((resolve, reject) => {
  const hmac = crypto.createHmac('md5', file);
  const readStream = fs.createReadStream(`${appRoot}/tests/files/${file}`);
  readStream.on('error', (error) => {
    throw Error(error);
  });
  readStream.on('data', (chunk) => {
    hmac.update(chunk);
  });
  readStream.on('end', () => {
    const checksum = hmac.digest('hex');
    resolve(checksum);
  });
});

describe('Routes: hash-validator', () => {
  context(`POST /hash-validator/checksum/${smallFile}`, () => {
    it(`generated checksum of ${smallFile} should match returned checksum`, async () => {
      let localChecksum;
      let returnedChecksum;
      try {
        localChecksum = await getFileChecksum(smallFile);
        const readStream = fs.createReadStream(`${appRoot}/tests/files/${smallFile}`);
        await request(app).post(`/hash-validator/checksum/${smallFile}`, readStream).then(
          (res) => {
            returnedChecksum = res.data;
          },
          (error) => { throw Error(error); },
        );
      } catch (error) {
        logger.error(error);
      } finally {
        returnedChecksum.should.equal(localChecksum);
      }
    });
  });

  context(`POST /hash-validator/checksum/${largeFile}`, () => {
    it(`generated checksum of ${largeFile} should match returned checksum`, async () => {
      let localChecksum;
      let returnedChecksum;
      try {
        localChecksum = await getFileChecksum(largeFile);
        const readStream = fs.createReadStream(`${appRoot}/tests/files/${largeFile}`);
        await request(app).post(`/hash-validator/checksum/${largeFile}`, readStream).then(
          (res) => {
            returnedChecksum = res.data;
          },
          (error) => { throw Error(error); },
        );
      } catch (error) {
        logger.error(error);
      } finally {
        returnedChecksum.should.equal(localChecksum);
      }
    });
  });
});
