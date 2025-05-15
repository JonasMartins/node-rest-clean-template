
import { ClearChargesApplication } from '@/application/clear-charges';
import { BaseController } from '@/controllers/base';
import { Request, Response } from 'express';

export class ClearChargesController extends BaseController {
  private readonly clearChargesApplication: ClearChargesApplication;

  constructor(clearChargesApplication: ClearChargesApplication) {
    super();
    this.clearChargesApplication = clearChargesApplication;
  }

  async clearCharges(_: Request, res: Response): Promise<void> {
    try {
      const result = await this.clearChargesApplication.perform();
      this.ok(res, result);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
