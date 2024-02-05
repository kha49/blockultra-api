import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import ListPermFlow from '../../../../usecase/admin-cms/permission/list.flow';
import { PermService } from '../../../../infrastructure/services/core/perm.service';
import { Perm } from '../../../../core/schemas/core/perm';

export class PermCtrl {
  private readonly flow: ListPermFlow;
  constructor(private readonly em: EntityManager) {
    const service = new PermService(this.em.getRepository(Perm));
    this.flow = new ListPermFlow(service);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let res = await this.flow.execute();
    ctx.body = res;
  }
}
