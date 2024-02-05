import { IIeoIdoTopIdoLaunchPadService } from '../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class SearchUnlockFlow {
  constructor(private readonly service: IIeoIdoTopIdoLaunchPadService) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();

    if (key) {
      CtrlUtil.applySearchQuery(key, 'key', query);
      // query.where('key LIKE :key', { key: `%${key}%` });
    } else {
      query.orderBy('"marketCap"', 'ASC').take(20);
    }
    query.select(BusinessSearch.SELECT_TOKEN_UNLOCK_PROPS);
    const datas = await query.getRawMany();
    return datas;
  }
}

export default SearchUnlockFlow;
