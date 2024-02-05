import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CoinFundraising } from '../../core/schemas/coin-detail/fundraising/coin-fundraising';

export class CoinFundraisingService extends BaseService<CoinFundraising> {
  constructor(private readonly repo: Repository<CoinFundraising>) {
    super(repo);
  }

  async getCountByKey(key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coin_key: key });
    return await query.getCount();
  }
}
