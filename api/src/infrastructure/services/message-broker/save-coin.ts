import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';
import { Coin } from '../../../core/schemas/home/coin';

export class SaveCoinService extends SaveBase<Coin> {
  constructor(em: EntityManager) {
    super(em, Coin);
  }
}
