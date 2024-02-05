import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule';

export class SearchIeoIdoFilterFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('start_date', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_IEO_IDO_UPCOMING_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchIeoIdoFilterFlow;
