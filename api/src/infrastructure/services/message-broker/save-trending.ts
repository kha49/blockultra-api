import { EntityManager } from 'typeorm';
import { Trending } from '../../../core/schemas/home/trending';
import { SaveBase } from './save-base';

export class SaveTrending extends SaveBase<Trending> {
  constructor(em: EntityManager) {
    super(em, Trending);
  }
}
