import {
  AddChargesRequest,
  AddChargesResponse,
  type IAddCharges,
} from '@/domain/use-cases/add-charges';
import { ChargeRepository } from '@/infra/repository/memory/charges.repository';

export class AddChargesApplication implements IAddCharges {
  private readonly chargeRepository: ChargeRepository;
  constructor(chargeRepository: ChargeRepository) {
    this.chargeRepository = chargeRepository;
  }

  async perform(data: AddChargesRequest): Promise<AddChargesResponse> {
    try {
      this.chargeRepository.addCharges(data);
      return new Promise<AddChargesResponse>((resolve) => {
        resolve({
          success: true,
        });
      });
    } catch (error) {
      throw error;
    }
  }
}
