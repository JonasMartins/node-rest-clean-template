import { Repository } from '@/infra/repository/repository';
import { InvoiceEntity } from '@/domain/entities';
import { INVOICES_TABLE } from './db.repository';

export class InvoiceRepository extends Repository<InvoiceEntity> {
  constructor() {
    super(INVOICES_TABLE);
  }

  addInvoices(invoices: Array<InvoiceEntity>): void {
    for (let i = 0; i < invoices.length; i += 1) {
      this.update(invoices[i].partnerId, invoices[i]);
    }
  }

  getAllAsHash() {
    return this.items;
  }

  clearAllInvoices(): void {
    this.clearAll();
  }
}
