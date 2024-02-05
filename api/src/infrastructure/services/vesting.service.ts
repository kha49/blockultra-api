import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Vesting } from '../../core/schemas/coin-detail/tokenomic/vesting';

export class VestingService extends BaseService<Vesting> {
  constructor(private readonly repo: Repository<Vesting>) {
    super(repo);
  }

  async getCountByKey(coin_key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coin_key });
    return await query.getCount();
  }

  async getByCoinKey(coin_key: string): Promise<any> {
    let query = await this.repo.createQueryBuilder('v');
    query.leftJoinAndSelect('v.allocations', 'allocations');
    query.where({ coin_key });
    let vesting = await query.getOne();
    return vesting;
  }
}
