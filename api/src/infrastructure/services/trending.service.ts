import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Trending } from '../../core/schemas/home/trending';

export class TrendingService extends BaseService<Trending> {
  constructor(private readonly repo: Repository<Trending>) {
    super(repo);
  }
}
