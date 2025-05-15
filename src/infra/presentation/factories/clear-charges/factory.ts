import { ClearChargesApplication } from '@/application/clear-charges';
import { ClearChargesController } from '@/controllers/clear-charges';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';
import { ClearChargesRouter } from '@/infra/presentation/routes/clear-charges/router';
import { InvoiceRepository } from '@/infra/repository/memory/invoices.repository';

const buildController = (): ClearChargesController => {
  const chargeRepo = new ChargeRepository();
  const invoiceRepo = new InvoiceRepository();
  const app = new ClearChargesApplication(chargeRepo, invoiceRepo);
  return new ClearChargesController(app);
};

export const BuildClearChargesRouter = (): ClearChargesRouter => {
  const ctrl = buildController();
  return new ClearChargesRouter(ctrl);
};
