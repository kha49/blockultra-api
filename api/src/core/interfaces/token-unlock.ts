import { IBaseService } from './core/base';
import { TokenUnlock } from '../schemas/unlock/token-unlock';

export interface ITokenUnlock extends IBaseService<TokenUnlock> {
  getTokenUnlock(coin_key: string): Promise<any>;
}
