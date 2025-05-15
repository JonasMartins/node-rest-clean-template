import { ChargeEntity } from './charge.entity';

export type InvoiceEntity = {
  partnerId: string;
  total: number;
  charges: Array<ChargeEntity>;
};
