import { IBaseService } from './core/base';
import { CoinIeoIdo } from '../../core/schemas/coin-detail/ieo-ido/coin-ieo-ido';

export interface ICoinIeoIdoService extends IBaseService<CoinIeoIdo> {
  findIdoPrice(coin_key: string): Promise<any>;
  getCountByKey(key: string): Promise<any>;
}
