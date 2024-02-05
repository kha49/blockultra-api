import { Gainer } from '../../../core/schemas/home/gainer';
import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';

export class SaveGainer extends SaveBase<Gainer> {
  constructor(em: EntityManager) {
    super(em, Gainer);
  }
}
