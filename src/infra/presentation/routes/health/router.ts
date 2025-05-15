import { Router } from 'express';
import { HealthController } from '@/controllers/health';

export class HealthRouter {
  private router: Router;
  private healthController: HealthController;

  constructor(healthController: HealthController) {
    this.router = Router();
    this.healthController = healthController;
    this.buildRoute();
  }

  private buildRoute() {
    this.router.get('/', (req, res) => this.healthController.health(req, res));
  }

  public getRouter(): Router {
    return this.router;
  }
}
