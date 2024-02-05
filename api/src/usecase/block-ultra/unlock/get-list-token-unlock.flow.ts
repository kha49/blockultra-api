import BusinessUnlock from '../../../core/business/block-ultra/logic/unlock.logic';
import { BusinessUnlockRule } from '../../../core/business/block-ultra/rule/unlock.rule';
import { ITokenUnlock } from '../../../core/interfaces/token-unlock';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetListTokenUnlockFlow {
  constructor(private readonly unlockService: ITokenUnlock) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.unlockService.getQueryBuilder('tu');
    try { 
      if (search_key) {
        const keys = search_key.split(",");
        query.leftJoin("ieo_ido_project", 'iip', 'tu.key = iip.key');
        query.innerJoin("coins", 'c', 'tu.key = c.key');
        query.where("EXISTS (SELECT 1 FROM json_array_elements(iip.launchpads) AS lp WHERE lp->>'key' IN (:...keys))",{ keys: keys });  
      }  else {
        query.leftJoin('ieo_ido_project', 'iip', 'tu.key = iip.key');
        query.innerJoin('coins', 'c', 'tu.key = c.key'); 
      }
      const fieldSort = sort_by ? sort_by == "roi" ? "iip.roi" : `tu.${sort_by}`: "";

      CtrlUtil.applySortQuery(fieldSort, sort_order, query);
      CtrlUtil.applyPaginationQuery(limit, page, query);
      query.select(BusinessUnlockRule.SELECT_UNLOCK_PROPS);
      
      const datas = await query.getRawMany();
      const total = await query.getCount();
      const unlocks = BusinessUnlock.getUnlockProps(datas);
      const res = CtrlUtil.getPagingFormat(unlocks, page, limit, total);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default GetListTokenUnlockFlow;
