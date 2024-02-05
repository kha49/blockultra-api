import BusinessIeoIdo from '../../../../core/business/block-ultra/logic/ieo-ido.logic';
import { IIeoIdoTopIdoLaunchPadService } from '../../../../core/interfaces/ieo-ido-top-ido-launch-pad';
import { CtrlUtil } from '../../../../core/utils/ctrl.util';

export class GetIeoIdoTopLaunchPadFlow {
  constructor(private readonly service: IIeoIdoTopIdoLaunchPadService) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where({ type: 'IDO' });
    CtrlUtil.applySortQuery(sort_by, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    CtrlUtil.applySearchQuery(search_key || '', 'key', query);
    let datas = await query.getMany();
    const total = await query.getCount();
    datas = BusinessIeoIdo.getTopIdoLaunchPad(datas);
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetIeoIdoTopLaunchPadFlow;
