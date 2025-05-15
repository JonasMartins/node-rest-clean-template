import request from 'supertest';
import express from 'express';
import { AppRouter } from '@/infra/presentation/routes/app/app.router';
import { ErrorMiddleware } from '@/infra/middlewares/error.middleware';
import { ChargeEntity } from '@/domain/entities';

describe('Charges endpoint integration tests ', () => {
  const app = express();

  const mainPath = '/charges';

  beforeAll(() => {
    app.use(express.json());
    app.use('/', AppRouter.setup());
    app.use(ErrorMiddleware.handle);
  });

  describe('POST /charges', () => {
    it('should clear previous charges', async () => {
      const response = await request(app).post('/clear-charges');
      expect(response.status).toBe(200);
    });

    it('should return 201 status code', async () => {
      const payload = [
        {
          chargeId: 'c126',
          partnerId: 'net-01',
          amount: 199.9,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
        {
          chargeId: 'c127',
          partnerId: 'net-01',
          amount: 199.9,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
        {
          chargeId: 'c128',
          partnerId: 'net-01',
          amount: 199.9,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
      ] as Array<ChargeEntity>;
      const response = await request(app)
        .post(mainPath)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
    });

    it('should return bad request on invalid body, missing amount', async () => {
      const payload = [
        {
          chargeId: 'c126',
          partnerId: 'net-01',
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
      ] as Array<ChargeEntity>;
      const response = await request(app)
        .post(mainPath)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
    });

    it('should return bad request on empty body', async () => {
      const payload = [] as Array<ChargeEntity>;
      const response = await request(app)
        .post(mainPath)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
    });

    it('should return bad request on invalid timestamp 1', async () => {
      const payload = [
        {
          chargeId: 'c126',
          partnerId: 'net-01',
          amount: 100,
          reference: '2024-01',
          timestamp: '',
        },
      ] as Array<ChargeEntity>;
      const response = await request(app)
        .post(mainPath)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
    });

    it('should return bad request on invalid timestamp 2', async () => {
      const payload = [
        {
          chargeId: 'c126',
          partnerId: 'net-01',
          amount: 100,
          reference: '2024-01',
          timestamp: 'invalid',
        },
      ] as Array<ChargeEntity>;
      const response = await request(app)
        .post(mainPath)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(400);
    });
  });
});
