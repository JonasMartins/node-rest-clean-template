import { Router } from 'express';
import { GetInvoicesController } from '@/controllers/get-invoices';

export class GetInvoicesRouter {
  private router: Router;
  private ctrl: GetInvoicesController;

  constructor(ctrl: GetInvoicesController) {
    this.router = Router();
    this.ctrl = ctrl;
    this.buildRoute();
  }

  private buildRoute() {
    this.router.get('/', (req, res) => this.ctrl.getInvoices(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}
