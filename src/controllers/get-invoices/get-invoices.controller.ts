import { GetInvoicesApplication } from '@/application/get-invoices';
import { BaseController } from '@/controllers/base';
import { Request, Response } from 'express';

export class GetInvoicesController extends BaseController {
  private readonly getInvoicesApplication: GetInvoicesApplication;

  constructor(getInvoicesApplication: GetInvoicesApplication) {
    super();
    this.getInvoicesApplication = getInvoicesApplication;
  }

  async getInvoices(_: Request, res: Response): Promise<void> {
    try {
      const result = await this.getInvoicesApplication.perform();
      this.ok(res, result);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
