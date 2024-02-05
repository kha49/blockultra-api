import { Loser } from '../../../core/schemas/home/loser';
import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';

export class SaveLoser extends SaveBase<Loser> {
  constructor(em: EntityManager) {
    super(em, Loser);
  }
}
