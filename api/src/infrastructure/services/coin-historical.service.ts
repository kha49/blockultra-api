import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CoinMarketHistorical } from '../../core/schemas/coin-detail/market/coin-market-historical';

export class CoinHistoricalService extends BaseService<CoinMarketHistorical> {
  constructor(private readonly repo: Repository<CoinMarketHistorical>) {
    super(repo);
  }

  async getCountByKey(key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coinKey: key });
    return await query.getCount();
  }
}
