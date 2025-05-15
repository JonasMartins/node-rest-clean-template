import { type IHealth, type HealthResponse } from '@/domain/use-cases/health';

export class HealthApplication implements IHealth {
  constructor() {}

  async perform(): Promise<HealthResponse> {
    return new Promise<HealthResponse>((resolve) => {
      resolve({
        success: true,
      });
    });
  }
}
