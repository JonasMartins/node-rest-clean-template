import { HealthController } from '@/controllers/health';
import { HealthApplication } from '@/application/health';
import { HealthRouter } from '@/infra/presentation/routes/health/router';

const buildHealthController = (): HealthController => {
  const app = new HealthApplication();
  const ctrl = new HealthController(app);
  return ctrl;
};

export const BuildHealthRouter = (): HealthRouter => {
  const ctrl = buildHealthController();
  return new HealthRouter(ctrl);
};
