import { ICoinService } from '../../../core/interfaces/coin';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic';

export class GetPortfolioListFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(params: {
    backer_id: number;
    search_key?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
  }) {
    const {
      backer_id,
      search_key = '',
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
    } = params;
    const query = await this.service.getQueryBuilder();
    query.where(':fundId = ANY(SELECT value::text FROM json_array_elements_text("fundIds"::json))',{ fundId: backer_id });
    if(search_key != '') query.andWhere({'key': search_key})
    const sortField = sort_by == "price24hPercent" ? "price" : sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    let datas = await query.getMany();
    datas = BusinessBacker.getPortfolio(datas);
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetPortfolioListFlow;
