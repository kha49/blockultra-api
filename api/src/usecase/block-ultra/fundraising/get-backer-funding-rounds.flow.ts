import { IFundraisingService } from '../../../core/interfaces/fundraising';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic';

export class GetFundingRoundListFlow {
  constructor(private readonly service: IFundraisingService) {}

  async execute(params: {
    slug: string;
    search_key?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
  }) {
    const {
      slug,
      search_key = '',
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
    } = params;
    const query = await this.service.getQueryBuilder();
    query.where({ slug });
    CtrlUtil.applySearchQuery(search_key || '', '', query);
    CtrlUtil.applySortQuery(sort_by, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    let datas = await query.getMany();
    datas = BusinessBacker.getFundingRound(datas);
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetFundingRoundListFlow;
