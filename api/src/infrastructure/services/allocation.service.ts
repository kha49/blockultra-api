import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Allocation } from '../../core/schemas/coin-detail/tokenomic/allocation';

export class AllocationService extends BaseService<Allocation> {
  constructor(private readonly repo: Repository<Allocation>) {
    super(repo);
  }
}
