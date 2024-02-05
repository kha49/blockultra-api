import BusinessExchange from '../../../core/business/block-ultra/logic/exchange.logic';
import { IExchangeSpot } from '../../../core/interfaces/exchange-spot';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { DateUtil } from '../../../core/utils/date.util';

export class GetListExchangeFlow {
  constructor(private readonly service: IExchangeSpot) {}
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
    const sortField = sort_by == 'tier' ? '' : sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    // const dataFilter = {created_at: Between(today, new Date(today.getTime() + 86400000))};
    // query.andWhere(dataFilter);

    const datas = await query.getMany();
    const total = await query.getCount();

    const dateYesterday = DateUtil.getYesterdayDate();
    query.select(['key', '"reportedVolumes"']);
    query.andWhere({ created_at: dateYesterday });
    const data24HoursAgo = await query.getRawMany();

    const result = BusinessExchange.getExchangeSpotList(datas, data24HoursAgo);
    const res = CtrlUtil.getPagingFormat(result, page, limit, total);
    return res;
  }
}
export default GetListExchangeFlow;
