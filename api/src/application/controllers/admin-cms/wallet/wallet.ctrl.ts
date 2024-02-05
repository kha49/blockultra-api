import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { Wallet } from '../../../../core/schemas/cms/wallet';
import { WalletService } from '../../../../infrastructure/services/wallet.service';
import CrudWalletFlow from '../../../../usecase/admin-cms/wallet/crud_wallet.flow';

export class CrudWalletCtrl {
  private readonly flow: CrudWalletFlow;
  constructor(private readonly em: EntityManager) {
    const service = new WalletService(this.em.getRepository(Wallet));
    this.flow = new CrudWalletFlow(service);
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
