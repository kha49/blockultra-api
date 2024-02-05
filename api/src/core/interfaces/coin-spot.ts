import { IBaseService } from './core/base';
import { CoinMarketSpot } from '../schemas/coin-detail/market/coin-market-spot';

export interface ICoinSpotService extends IBaseService<CoinMarketSpot> {
    getCountByKey(key: string): Promise<any>;
}
