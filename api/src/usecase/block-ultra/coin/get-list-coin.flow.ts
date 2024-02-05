import BusinessCoin     from '../../../core/business/block-ultra/logic/coin.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { CtrlUtil }     from '../../../core/utils/ctrl.util';

export class GetCoinListFlow {
  constructor(private readonly service: ICoinService) {}

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
    const sortField = sort_by == "average24h" ? "price": sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const dataResult = BusinessCoin.getCoinInList(datas);
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total); 
    return result;
  }
}

export default GetCoinListFlow;
