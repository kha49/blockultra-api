import { CoinMarketHistorical } from '../schemas/coin-detail/market/coin-market-historical';
import { IBaseService } from './core/base';

export interface ICoinHistoricalService
  extends IBaseService<CoinMarketHistorical> {
  getCountByKey(key: string): Promise<any>;
}
