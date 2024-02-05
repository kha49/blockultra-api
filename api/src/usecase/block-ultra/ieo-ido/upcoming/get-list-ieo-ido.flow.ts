import BusinessIeoIdo from '../../../../core/business/block-ultra/logic/ieo-ido.logic';
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import { CtrlUtil } from '../../../../core/utils/ctrl.util';

export class GetIeoIdoListFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(
    status: string,
    is_hot: string,
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where({ status });
    CtrlUtil.applySearchQuery(search_key, 'key', query);

    if (sort_by == 'backers') {
      query.orderBy('json_array_length(funds)', sort_order.toUpperCase());
    } else if(sort_by == 'launchpads'){
      query.orderBy('json_array_length(launchpads)', sort_order.toUpperCase());
    } else {
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
    } 
    const datas = await query.getMany();
    const total = await query.getCount();
    let result = BusinessIeoIdo.getIeoIdoUpcoming(datas);
    if (is_hot == 'hot') {
      result = result.filter((item: any) => item.isHot);
    }
    result = CtrlUtil.applyPagination(limit, page, result);
    const res = CtrlUtil.getPagingFormat(result, page, limit, total);
    return res;
  }
}

export default GetIeoIdoListFlow;
