import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IFundraisingService } from '../../../core/interfaces/fundraising';

export class SearchBackerFindingRoundFilterFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('date', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_FUNDRAISING_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchBackerFindingRoundFilterFlow;
