import { EntityManager } from 'typeorm';
import { Backer } from '../../../core/schemas/backer';
import { SaveBase } from './save-base';

export class SaveFunds extends SaveBase<Backer> {
  constructor(em: EntityManager) {
    super(em, Backer);
  }
}
