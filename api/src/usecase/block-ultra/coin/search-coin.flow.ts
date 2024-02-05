import BusinessSearch     from '../../../core/business/block-ultra/rule/search.rule';
import { ICoinService }   from '../../../core/interfaces/coin';

export class SearchCoinFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('rank', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_COIN_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchCoinFlow;
