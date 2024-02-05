import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IExchangeSpot } from '../../../core/interfaces/exchange-spot';

export class SearchExchangeSpotFlow {
  constructor(private readonly service: IExchangeSpot) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('"percentVolume"', 'DESC').take(20);
    }
    query.select(BusinessSearch.SELECT_EXCHANGE_SPOT_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchExchangeSpotFlow;
