import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { ICategoryService } from '../../../core/interfaces/category';

export class CrudCategoryFlow {
  private readonly service;
  constructor(_service: ICategoryService) {
    this.service = _service;
  }

  async create(item: any) {
    const result = await this.service.create(item);
    return { status: 'success', result };
  }

  async update(item: any) {
    const result = await this.service.create(item);
    return { status: 'success', result };
  }

  async deletes(ids: any) {
    const result = await this.service.deletes(ids);
    return { status: 'success', result };
  }

  async list(
    search_key: string,
    sort_by: string,
    sort_order: 'asc' | 'desc',
    limit: number,
    page: number,
  ) {
    const query = await this.service.getQueryBuilder();
    query.where("'1'='1'");
    CtrlUtil.applySearchQuery(search_key, 'key', query);
    const sortField = sort_by == 'average24h' ? 'price' : sort_by;
    CtrlUtil.applySortQuery(sortField, sort_order, query);
    CtrlUtil.applyPaginationQuery(limit, page, query);
    const datas = await query.getMany();
    const total = await query.getCount();
    const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
    return result;
  }
}

export default CrudCategoryFlow;
