import { ClearChargesResponse, IClearCharges } from '@/domain/use-cases/clear-charges';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';
import { InvoiceRepository } from '@/infra/repository/memory/invoices.repository';

export class ClearChargesApplication implements IClearCharges {
  private readonly chargeRepository: ChargeRepository;
  private readonly invoiceRepository: InvoiceRepository;
  constructor(chargeRepository: ChargeRepository, invoiceRepository: InvoiceRepository) {
    this.chargeRepository = chargeRepository;
    this.invoiceRepository = invoiceRepository;
  }

  async perform(): Promise<ClearChargesResponse> {
    try {
      this.chargeRepository.clearAllCharges();
      this.invoiceRepository.clearAllInvoices();
      return new Promise<ClearChargesResponse>((resolve) => {
        resolve({
          success: true,
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
