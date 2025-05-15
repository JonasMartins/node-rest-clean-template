import { SuccessResponse } from '@/domain/utils/types';

export interface IClearCharges {
  perform(): Promise<ClearChargesResponse>;
}

export type ClearChargesResponse = SuccessResponse;
