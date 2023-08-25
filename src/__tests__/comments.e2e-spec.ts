import request from 'supertest';
import { Express } from 'express';
import createApplication from '../utils/app';

describe('App', () => {
  let app: Express;

  beforeAll(async () => {
    app = await createApplication();
  });

  describe('GET /comments', () => {
    it('should return 200 OK', () => {
      return request(app)
        .get('/comments')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });
});
