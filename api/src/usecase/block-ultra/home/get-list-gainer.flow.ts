import BusinessGainerLoser from '../../../core/business/block-ultra/logic/gainer-loser.logic';
import { IGainerService } from '../../../core/interfaces/gainer';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetGainersListFlow {
  constructor(private readonly service: IGainerService) {}

  async execute(
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    const sortField = sort_by == "priceChangeIn24" ? "price": sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const dataResult = BusinessGainerLoser.getGainerLoserProps(datas);
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total);  
    return result;
  }
}

export default GetGainersListFlow;
