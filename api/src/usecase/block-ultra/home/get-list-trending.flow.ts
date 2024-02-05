import BusinessTrending from '../../../core/business/block-ultra/logic/trending.logic';
import { ITrendingService } from '../../../core/interfaces/trending';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetTrendingListFlow {
  constructor(private readonly service: ITrendingService) {}

  async execute(
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder("td");
    query.innerJoin('coins', 'c', 'td.key = c.key');
    query.where("'1'='1'");
    CtrlUtil.applyPaginationQuery(limit, page, query);
    query.select(['c._id' ,'c.key', 'c.name', 'c.price', 'c.symbol', 'c.image', 'c.volume24h', 'c.chart', 'c.marketCap', 'c.histPrices']);
    const datas = await query.getRawMany();
    const total = await query.getCount();
    const result = BusinessTrending.getHomeTrendings(datas);
    const res = CtrlUtil.getPagingFormat(result, page, limit, total);
    return res;
  }
}

export default GetTrendingListFlow;
