import { IIeoIdoTopIdoLaunchPadService } from '../../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import BusinessSearch from '../../../../core/business/block-ultra/rule/search.rule';

export class SearchIeoIdoTopIdoLaunchPadFlow {
  constructor(private readonly service: IIeoIdoTopIdoLaunchPadService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    if (key) {
      query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('"marketCap"', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_IEO_IDO_TOP_LAUNCH_PAD_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchIeoIdoTopIdoLaunchPadFlow;
