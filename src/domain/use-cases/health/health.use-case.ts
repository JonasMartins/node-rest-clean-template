import { SuccessResponse } from '@/domain/utils/types';

export interface IHealth {
  perform(): Promise<HealthResponse>;
}

export type HealthResponse = SuccessResponse;
