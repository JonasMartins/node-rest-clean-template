import request from 'supertest';
import express from 'express';
import { AppRouter } from '@/infra/presentation/routes/app/app.router';
import { ErrorMiddleware } from '@/infra/middlewares/error.middleware';
import { ChargeEntity } from '@/domain/entities';
import { GetInvoicesResponseData } from '@/domain/use-cases/ge-invoices';

describe('invoices endpoint integration tests ', () => {
  const app = express();

  const mainPath = '/invoices';

  beforeAll(() => {
    app.use(express.json());
    app.use('/', AppRouter.setup());
    app.use(ErrorMiddleware.handle);
  });

  describe('GET /invoices', () => {
    it('should clear previous charges', async () => {
      const response = await request(app).post('/clear-charges');
      expect(response.status).toBe(200);
    });

    it('should return an empty array as response', async () => {
      const response = await request(app).get(mainPath);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should add some charges and return 201 status code', async () => {
      const payload = [
        {
          chargeId: 'c126',
          partnerId: 'net-01',
          amount: 100,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
        {
          chargeId: 'c127',
          partnerId: 'net-01',
          amount: 100,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
        {
          chargeId: 'c128',
          partnerId: 'net-02',
          amount: 100,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
      ] as Array<ChargeEntity>;
      const response = await request(app)
        .post('/charges')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);
    });

    it('should return an array as response', async () => {
      const response = await request(app).get(mainPath);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((x: GetInvoicesResponseData) => {
        expect(typeof x).toBe('object');
        expect(x).not.toBe(null);
      });
    });

    it('invoices should have correct amount', async () => {
      const response = await request(app).get(mainPath);
      expect(response.status).toBe(200);
      response.body.forEach((x: GetInvoicesResponseData) => {
        if (x.partnerId === 'net-01') {
          expect(x.total).toBe(200);
          expect(x.charges.length).toBe(2);
        }
      });
    });

    it('invoices should have correct amount after new insert', async () => {
      // add mais 100 ao net-02 total
      const payload = [
        {
          chargeId: 'c129',
          partnerId: 'net-02',
          amount: 100,
          reference: '2024-01',
          timestamp: '2024-01-15T10:00:00Z',
        },
      ] as Array<ChargeEntity>;

      let response = await request(app)
        .post('/charges')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
      expect(response.status).toBe(201);

      // após adicção, total deve ser igual a 200
      response = await request(app).get(mainPath);
      expect(response.status).toBe(200);
      response.body.forEach((x: GetInvoicesResponseData) => {
        if (x.partnerId === 'net-02') {
          expect(x.total).toBe(200);
          expect(x.charges.length).toBe(2);
        }
      });
    });
  });
});
