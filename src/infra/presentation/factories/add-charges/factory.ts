import { AddChargesController } from '@/controllers/add-charges';
import { AddChargesApplication } from '@/application/add-charges';
import { AddChargesRouter } from '@/infra/presentation/routes/add-charges/router';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';

const buildController = (): AddChargesController => {
  const repo = new ChargeRepository();
  const app = new AddChargesApplication(repo);
  return new AddChargesController(app);
};

export const BuildAddChargesRouter = (): AddChargesRouter => {
  const ctrl = buildController();
  return new AddChargesRouter(ctrl);
};
