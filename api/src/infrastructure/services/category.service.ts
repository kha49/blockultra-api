import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Category } from '../../core/schemas/category';

export class CategoryService extends BaseService<Category> {
  constructor(private readonly repo: Repository<Category>) {
    super(repo);
  }
}
