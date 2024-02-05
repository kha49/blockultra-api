import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CoinMarketSpot } from '../../core/schemas/coin-detail/market/coin-market-spot';

export class CoinSpotService extends BaseService<CoinMarketSpot> {
  constructor(private readonly repo: Repository<CoinMarketSpot>) {
    super(repo);
  }

  async getCountByKey(key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coinKey: key });
    return await query.getCount();
  }
}
