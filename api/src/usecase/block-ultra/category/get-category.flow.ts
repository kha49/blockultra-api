import BusinessCategory from '../../../core/business/block-ultra/logic/category.logic';
import { ICategoryService } from '../../../core/interfaces/category';

export class GetCategoryFlow {
  constructor(private readonly service: ICategoryService) {}

  async execute(id: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ id });
    const category = await query.getOne();
    const result = BusinessCategory.getDetail(category);
    return result;
  }
}

export default GetCategoryFlow;
