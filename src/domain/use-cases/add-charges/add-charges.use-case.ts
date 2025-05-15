import { SuccessResponse } from '@/domain/utils/types';
import { ChargeEntity } from '@/domain/entities';

export interface IAddCharges {
  perform(data: AddChargesRequest): Promise<AddChargesResponse>;
}

export type AddChargesResponse = SuccessResponse;

export type AddChargesRequest = Array<AddChargesRequestData>;

export type AddChargesRequestData = ChargeEntity;
