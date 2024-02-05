import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Tag } from '../../core/schemas/common/tag';

export class TagService extends BaseService<Tag> {
  constructor(private readonly repo: Repository<Tag>) {
    super(repo);
  }
}
