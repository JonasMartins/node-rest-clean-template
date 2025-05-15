import {
  GetInvoicesResponse,
  GetInvoicesResponseData,
  IGetInvoices,
} from '@/domain/use-cases/ge-invoices';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';
import { InvoiceRepository } from '@/infra/repository/memory/invoices.repository';

export class GetInvoicesApplication implements IGetInvoices {
  private readonly chargeRepository: ChargeRepository;
  private readonly invoiceRepository: InvoiceRepository;

  constructor(chargeRepository: ChargeRepository, invoiceRepository: InvoiceRepository) {
    this.chargeRepository = chargeRepository;
    this.invoiceRepository = invoiceRepository;
  }

  async perform(): Promise<GetInvoicesResponse> {
    try {
      let res: Array<GetInvoicesResponseData> = [];
      let invoices = this.invoiceRepository.getAllAsHash();
      const allCharges = this.chargeRepository.getAll();

      // const invoices: Map<string, GetInvoicesResponseData> = new Map();
      let currentPartnerId = '';
      let currentInvoiceData: GetInvoicesResponseData | undefined = undefined;
      if (allCharges.length) {
        for (let i = 0; i < allCharges.length; i += 1) {
          currentPartnerId = allCharges[i].partnerId;
          // se não tem, adiciona
          if (!invoices.has(currentPartnerId)) {
            invoices.set(currentPartnerId, {
              partnerId: currentPartnerId,
              total: allCharges[i].amount,
              charges: [allCharges[i]],
            });
          } else {
            // se já existe no map, autaliza amount e charges
            currentInvoiceData = invoices.get(currentPartnerId);
            if (currentInvoiceData) {
              currentInvoiceData.charges.push(allCharges[i]);
              currentInvoiceData.total += allCharges[i].amount;
            }
          }
        }
      }

      // add os dados em res em ordem
      res = res.concat(Array.from(invoices.values()).sort((a, b) => b.total - a.total));
      // salva invoices
      this.invoiceRepository.addInvoices(res);
      // remove charges
      this.chargeRepository.clearAllCharges();

      return new Promise<GetInvoicesResponse>((resolve) => {
        resolve(res);
      });
    } catch (error) {
      throw error;
    }
  }
}
