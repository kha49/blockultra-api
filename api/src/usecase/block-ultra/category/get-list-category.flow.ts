import BusinessCategory from "../../../core/business/block-ultra/logic/category.logic";
import { ICategoryService } from "../../../core/interfaces/category";
import { CtrlUtil } from "../../../core/utils/ctrl.util";

 

export class GetCategoryListFlow {
  constructor(private readonly service: ICategoryService) {}

  async execute(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where("'1'='1'");
    CtrlUtil.applySearchQuery(search_key || '', 'slug', query);
    const sortFied = sort_by == "avgPriceChange" ? "volume24h": sort_by;
    CtrlUtil.applySortQuery(sortFied, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const result = BusinessCategory.getHomeCategories(datas);
    const res = CtrlUtil.getPagingFormat(result, page, limit, total);  
    return res;
  }
}

export default GetCategoryListFlow;
