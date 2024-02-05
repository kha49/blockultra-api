import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule'; 
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';

export class SearchLaunchPadProjectFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('"marketCap"', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_LAUNCH_PAD_PROJECT_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchLaunchPadProjectFlow;
