import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IFundraisingService } from '../../../core/interfaces/fundraising';

export class SearchFundingRoundFilterFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(slug: string) {
    const query = await this.service.getQueryBuilder();
    if (slug) {
      query.where('slug LIKE :slug', { slug: `%${slug}%` });
      query.select(`DISTINCT ${BusinessSearch.SELECT_FUNDRAISING_PROPS}`);
    } else {
      query.orderBy('"announceDate"', 'ASC').take(20);
      query.select(BusinessSearch.SELECT_FUNDRAISING_PROPS);
    }

    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchFundingRoundFilterFlow;
