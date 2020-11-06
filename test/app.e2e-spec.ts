import 'dotenv/config';
import * as request from 'supertest';

const app = 'http://localhost:3000/api';

describe('ROOT', () => {
  it('should ping', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});