import BusinessCategory from '../../../core/business/block-ultra/logic/category.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GetCoinByCategoryFlow {
  constructor(private readonly service: ICoinService) {}

  async execute(
    categoryId: number,
    search_key: string = '',
    sort_by: string = '',
    sort_order?: 'asc' | 'desc',
    limit?: number,
    page?: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where({ categoryId });
    CtrlUtil.applySearchQuery(search_key, 'key', query);
    const sortField = sort_by == 'priceChangeIn24h' ? 'price' : sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order || 'asc', query);
    CtrlUtil.applyPaginationQuery(limit || 10, page || 1, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const dataResult = BusinessCategory.getCoinInList(datas);
    const result = CtrlUtil.getPagingFormat(
      dataResult,
      page || 1,
      limit || 10,
      total,
    );
    return result;
  }
}

export default GetCoinByCategoryFlow;
