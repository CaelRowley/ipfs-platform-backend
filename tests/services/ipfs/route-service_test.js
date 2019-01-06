/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import isIPFS from 'is-ipfs';
import { ipfsService } from '../../../src/services/ipfs/route-service';

const should = chai.should();

describe('Services: ipfs', () => {
  context('routeService.upload()', () => {
    it('should return a valid hash', async () => {
      const fileHash = await ipfsService.upload();
      isIPFS.multihash(fileHash).should.equal(true);
    }).timeout(10000);
  });
});
