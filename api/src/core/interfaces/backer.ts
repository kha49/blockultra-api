import { IBaseService } from './core/base';
import { Backer } from '../schemas/backer';

export interface IBackerService extends IBaseService<Backer> {
  getBackers(fund_ids: any): Promise<any>;
  fetchGainerLoser(backers: any): Promise<any>;
  fetchMarketCap(backers: any): Promise<any>;
  getSocials(slug: string): Promise<any>;
  getUnicorns(): Promise<any>;
}
