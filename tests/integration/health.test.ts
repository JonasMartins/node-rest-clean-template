import request from 'supertest';
import express from 'express';
import { AppRouter } from '@/infra/presentation/routes/app/app.router';
import { ErrorMiddleware } from '@/infra/middlewares/error.middleware';

describe('Health Endpoint Integration Tests', () => {
  const app = express();

  const mainPath = '/health';

  beforeAll(() => {
    app.use(express.json());
    app.use('/', AppRouter.setup());
    app.use(ErrorMiddleware.handle);
  });

  describe('GET /health', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get(mainPath);
      expect(response.status).toBe(200);
    });

    it('should return { success: true } in the response body', async () => {
      const response = await request(app).get(mainPath);
      expect(response.body).toEqual({ success: true });
    });
  });
});
