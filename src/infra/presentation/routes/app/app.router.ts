import { BuildAddChargesRouter } from '@/infra/presentation/factories/add-charges';
import { BuildGetInvoicesRouter } from '@/infra/presentation/factories/get-invoices';
import { BuildHealthRouter } from '@/infra/presentation/factories/health';
import { BuildClearChargesRouter } from '@/infra/presentation/factories/clear-charges';
import {
  ROUTE_CHARGES,
  ROUTE_HEALTH,
  ROUTE_INVOICES,
  ROUTE_CLEAR_CHARGES,
} from '@/infra/utils/consts';
import { Router } from 'express';

export class AppRouter {
  public static setup(): Router {
    const router = Router();
    const healthRouter = BuildHealthRouter();
    const addChargesRouter = BuildAddChargesRouter();
    const getInvoicesRouter = BuildGetInvoicesRouter();
    const clearChargesRouter = BuildClearChargesRouter();

    // * GET /health
    router.use(ROUTE_HEALTH, healthRouter.getRouter());

    // * POST /charges
    router.use(ROUTE_CHARGES, addChargesRouter.getRouter());

    // * GET /invoices
    router.use(ROUTE_INVOICES, getInvoicesRouter.getRouter());

    // * POST /clear-charges -> also clear invoices (used for tests)
    router.use(ROUTE_CLEAR_CHARGES, clearChargesRouter.getRouter());

    return router;
  }
}
