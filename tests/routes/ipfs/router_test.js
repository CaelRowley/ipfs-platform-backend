/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../../../src/app';

const should = chai.should();

describe('Routes: ipfs', () => {
  context('GET /upload', () => {
    it('should respond with a HTTP 201 Created', (done) => {
      request(app).get('/upload').end((err, res) => {
        res.statusCode.should.equal(201);
        done();
      });
    }).timeout(10000);
  });

  context('GET /download', () => {
    it('should respond with a HTTP 200 OK', (done) => {
      request(app).get('/download').end((err, res) => {
        res.statusCode.should.equal(200);
        done();
      });
    });
  });
});
