import BusinessFundraising from '../../../core/business/block-ultra/logic/fundraising.logic';
import { IFundraisingService } from '../../../core/interfaces/fundraising';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetFundraisingListFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    CtrlUtil.applySearchQuery(search_key, 'slug', query);
    query.where("'1'='1'");
    if (sort_by == 'backers') {
      query.orderBy('json_array_length(investors)', sort_order.toUpperCase());
    } else {
      CtrlUtil.applySortQuery(
        sort_by || 'announceDate',
        sort_order || 'asc',
        query,
      );
    }

    CtrlUtil.applyPaginationQuery(limit, page, query);

    let datas = await query.getMany();
    const total = await query.getCount();
    datas = BusinessFundraising.getHomeFundraisingProps(datas);
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetFundraisingListFlow;
