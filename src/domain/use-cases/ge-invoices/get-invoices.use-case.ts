import { InvoiceEntity } from '@/domain/entities';

export interface IGetInvoices {
  perform(): Promise<GetInvoicesResponse>;
}

export type GetInvoicesResponse = Array<GetInvoicesResponseData>;

export type GetInvoicesResponseData = InvoiceEntity;
