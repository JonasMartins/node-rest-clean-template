import { Router } from 'express';
import { ClearChargesController } from '@/controllers/clear-charges';

export class ClearChargesRouter {
  private router: Router;
  private ctrl: ClearChargesController;

  constructor(ctrl: ClearChargesController) {
    this.router = Router();
    this.ctrl = ctrl;
    this.buildRoute();
  }

  private buildRoute() {
    this.router.post('/', (req, res) => this.ctrl.clearCharges(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}
