import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';
import { Category } from '../../../core/schemas/category';

export class SaveCategory extends SaveBase<Category> {
  constructor(em: EntityManager) {
    super(em, Category);
  }
}
