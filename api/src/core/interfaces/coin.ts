import { Coin } from '../schemas/home/coin';
import { IBaseService } from './core/base';

export interface ICoinService extends IBaseService<Coin> {
  getCompare(coin_key: string, category: string): Promise<any>;
  getRankCoinInCategory(coin_key: string): Promise<any>;
  findByCategory(category_id: number): Promise<any>;
  updateCoinDetail(coin: any): Promise<any>;
}
