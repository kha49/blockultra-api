import { ICoinService } from '../../../core/interfaces/coin';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule'; 

export class SearchCategoryFilterFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(key: string, categoryId: number) {
    const query = await this.service.getQueryBuilder();
    query.where({ categoryId });

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

export default SearchCategoryFilterFlow;
