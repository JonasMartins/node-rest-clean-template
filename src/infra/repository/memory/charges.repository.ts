import { Repository } from '@/infra/repository/repository';
import { ChargeEntity } from '@/domain/entities/charge.entity';
import { CHARGES_TABLES } from './db.repository';

export class ChargeRepository extends Repository<ChargeEntity> {
  constructor() {
    super(CHARGES_TABLES);
  }

  addCharges(charges: Array<ChargeEntity>): void {
    for (let i = 0; i < charges.length; i += 1) {
      this.insert(charges[i].chargeId, charges[i]);
    }
  }

  clearAllCharges(): void {
    this.clearAll();
  }
}
