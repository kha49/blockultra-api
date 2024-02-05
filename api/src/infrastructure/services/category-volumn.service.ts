import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CategoryVolumn } from '../../core/schemas/common/category-volume';

export class CategoryVolumnService extends BaseService<CategoryVolumn> {
  constructor(private readonly repo: Repository<CategoryVolumn>) {
    super(repo);
  }
}
