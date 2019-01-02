/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../../../src/app';

const should = chai.should();

describe('Routes: healthcheck', () => {
  context('GET /', () => {
    it('should respond with a HTTP 200 OK', (done) => {
      request(app).get('/').end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });
});
