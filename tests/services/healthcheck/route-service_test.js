/* eslint-disable no-unused-vars, no-undef */
import chai from 'chai';
import { healthcheck } from '../../../src/services/healthcheck/route-service';

const should = chai.should();
const healthCheckResponse = 'Health check!';

describe('Services: healthcheck', () => {
  context('routeService.healthcheck()', () => {
    it(`should return "${healthCheckResponse}"`, () => {
      healthcheck().should.equal(healthCheckResponse);
    });
  });
});
