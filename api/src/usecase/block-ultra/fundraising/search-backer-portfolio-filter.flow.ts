import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { ICoinService } from '../../../core/interfaces/coin';

export class SearchBackerPortfolioFilterFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string, backer_id: number) {
    const query = await this.service.getQueryBuilder();
    query.where(':fundId = ANY(SELECT value::text FROM json_array_elements_text("fundIds"::json))',{ fundId: backer_id });
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

export default SearchBackerPortfolioFilterFlow;
