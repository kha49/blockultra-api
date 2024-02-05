import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { IBackerService } from '../../../core/interfaces/backer';

export class SearchTopBackerFilterFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(slug: string) {
    const query = await this.service.getQueryBuilder();
    if (slug) {
      query.where('slug LIKE :slug', { slug: `%${slug}%` });
    } else {
      query.orderBy('tier', 'ASC').addOrderBy('"totalInvestments"', "ASC").take(20);
    }
    query.select(BusinessSearch.SELECT_TOPBACKER_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchTopBackerFilterFlow;
