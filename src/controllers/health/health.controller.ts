import { BaseController } from '@/controllers/base';
import { HealthApplication } from '@/application/health';
import { Request, Response } from 'express';

export class HealthController extends BaseController {
  private readonly healthApplication: HealthApplication;

  constructor(healthApplication: HealthApplication) {
    super();
    this.healthApplication = healthApplication;
  }

  async health(_: Request, res: Response): Promise<void> {
    try {
      const result = await this.healthApplication.perform();
      this.ok(res, result);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
