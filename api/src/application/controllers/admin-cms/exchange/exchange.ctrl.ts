import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { Exchange } from '../../../../core/schemas/cms/exchange';
import CrudExchangeFlow from '../../../../usecase/admin-cms/exchange/crud_launchpad.flow';
import { ExchangeService } from '../../../../infrastructure/services/exchange/exchange.service';

export class CmsExchangeCtrl {
  private readonly flow: CrudExchangeFlow;
  constructor(private readonly em: EntityManager) {
    const service = new ExchangeService(this.em.getRepository(Exchange));
    this.flow = new CrudExchangeFlow(service);
  }
  
  async findOne(ctx: Koa.Context, _next: Koa.Next) {
    let { id } = ctx.query;
    const res = await this.flow.findOne(id as string);
    ctx.body = res;
  }
  
  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_by = sort_by ? sort_by : 'marketCap';
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
