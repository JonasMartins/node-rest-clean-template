import { BaseController } from '@/controllers/base';
import { AddChargesApplication } from '@/application/add-charges';
import { Request, Response } from 'express';
import { addChargesSchema } from '@/domain/validations/charges.validation';

export class AddChargesController extends BaseController {
  private readonly addChargesApplication: AddChargesApplication;

  constructor(addChargesApplication: AddChargesApplication) {
    super();
    this.addChargesApplication = addChargesApplication;
  }

  async addCharges(req: Request, res: Response): Promise<void> {
    try {
      const data = addChargesSchema.safeParse(req.body);
      if (!data.success) {
        this.badRequest(res, data.error);
        return
      }

      const result = await this.addChargesApplication.perform(data.data!);
      this.created(res, result);
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
