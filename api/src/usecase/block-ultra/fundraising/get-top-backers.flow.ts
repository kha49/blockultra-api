import BusinessBacker from '../../../core/business/block-ultra/logic/backer.logic'; 
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { IBackerService } from '../../../core/interfaces/backer';

export class GetTopBackersFlow {
  constructor(private readonly service: IBackerService) {}

  async execute(
    search_key: string, 
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where("'1'='1'");
    CtrlUtil.applySearchQuery(search_key, 'slug', query);
    CtrlUtil.applySortQuery(sort_by, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    let datas = await query.getMany();
    const total = await query.getCount();
    datas = await this.service.fetchGainerLoser(datas);
    datas = await this.service.fetchMarketCap(datas);
    
    datas = BusinessBacker.getTopBackers(datas);
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default GetTopBackersFlow;
