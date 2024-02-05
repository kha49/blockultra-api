import { Vesting } from '../schemas/coin-detail/tokenomic/vesting';
import { IBaseService } from './core/base';

export interface IVestingService extends IBaseService<Vesting> {
  getCountByKey(key: string): Promise<any>;
  getByCoinKey(key: string): Promise<any>;
}
