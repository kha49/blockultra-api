import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import { CtrlUtil } from '../../../../core/utils/ctrl.util';

export class GetIeoIdoEndedFlow {
  constructor(private readonly service: IIeoIdoProjectService) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where("'1'='1'");
    CtrlUtil.applySearchQuery(search_key, 'key', query);
    CtrlUtil.applySortQuery(sort_by, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetIeoIdoEndedFlow;
