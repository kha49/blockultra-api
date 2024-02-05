import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { Category } from '../../../../core/schemas/category';
import { CategoryService } from '../../../../infrastructure/services/category.service';
import CrudCategoryFlow from '../../../../usecase/admin-cms/category/crud_category.flow';

export class CmsCategoryCtrl { 
  private readonly flow: CrudCategoryFlow;
  constructor(private readonly em: EntityManager) {
    const service = new CategoryService(this.em.getRepository(Category));
    this.flow = new CrudCategoryFlow(service);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_by = sort_by ? sort_by : 'market_cap';
    sort_order = sort_order ? sort_order : 'desc';
    const res = await this.flow.list(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.body = res;
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const { id } = ctx.query;
    const res = await this.flow.create(id as string);
    ctx.body = res;
  }

  async update(ctx: Koa.Context, _next: Koa.Next) {
    const { id } = ctx.query;
    const res = await this.flow.update(id as string);
    ctx.body = res;
  }
  
  async deletes(ctx: Koa.Context, _next: Koa.Next) {
    const { ids } = ctx.query;
    const res = await this.flow.deletes(ids as string);
    ctx.body = res;
  }
}
