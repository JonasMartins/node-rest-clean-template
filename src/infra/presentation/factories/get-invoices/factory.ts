import { GetInvoicesApplication } from '@/application/get-invoices';
import { GetInvoicesController } from '@/controllers/get-invoices';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';
import { GetInvoicesRouter } from '@/infra/presentation/routes/get-invoices/router';
import { InvoiceRepository } from '@/infra/repository/memory/invoices.repository';

const buildController = (): GetInvoicesController => {
  const chargeRepo = new ChargeRepository();
  const invoicesRepo = new InvoiceRepository();
  const app = new GetInvoicesApplication(chargeRepo, invoicesRepo);
  return new GetInvoicesController(app);
};

export const BuildGetInvoicesRouter = (): GetInvoicesRouter => {
  const ctrl = buildController();
  return new GetInvoicesRouter(ctrl);
};
