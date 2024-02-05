import { EntityManager } from 'typeorm';
import { TokenUnlock } from '../../../core/schemas/unlock/token-unlock';
import { SaveBase } from './save-base';

export class SaveTokenUnlock extends SaveBase<TokenUnlock> {
  constructor(em: EntityManager) {
    super(em, TokenUnlock);
  }
}
