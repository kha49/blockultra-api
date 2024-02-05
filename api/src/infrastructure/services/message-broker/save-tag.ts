import { Tag } from '../../../core/schemas/common/tag';
import { EntityManager } from 'typeorm';
import { SaveBase } from './save-base';

export class SaveTag extends SaveBase<Tag> {
  constructor(em: EntityManager) {
    super(em, Tag);
  }
}
