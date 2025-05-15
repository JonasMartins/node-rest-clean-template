import { Router } from 'express';
import { AddChargesController } from '@/controllers/add-charges';

export class AddChargesRouter {
  private router: Router;
  private ctrl: AddChargesController;

  constructor(ctrl: AddChargesController) {
    this.router = Router();
    this.ctrl = ctrl;
    this.buildRoute();
  }

  private buildRoute() {
    this.router.post('/', (req, res) => this.ctrl.addCharges(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}
