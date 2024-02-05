import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import GetGainersListFlow   from '../../../usecase/block-ultra/home/get-list-gainer.flow';
import GetLoserListFlow     from '../../../usecase/block-ultra/home/get-list-loser.flow';

import { Gainer } from '../../../core/schemas/home/gainer';
import { Loser }  from '../../../core/schemas/home/loser';

import { GainerService } from '../../../infrastructure/services/gainer.service';
import { LoserService }  from '../../../infrastructure/services/loser.service';

export class GainerLoserCtrl {
  private getGainerListFlow;
  private getLoserListFlow;

  constructor(private readonly em: EntityManager) {
    const gainerService = new GainerService(this.em.getRepository(Gainer));
    const loserService  = new LoserService(this.em.getRepository(Loser));

    this.getGainerListFlow = new GetGainersListFlow(gainerService);
    this.getLoserListFlow  = new GetLoserListFlow(loserService);
  }

  async getListGainer(ctx: Koa.Context, _next: Koa.Next) {
    const { sort_by, sort_order, limit, page } = ctx.query;
    const datas = await this.getGainerListFlow.execute(
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getListLoser(ctx: Koa.Context, _next: Koa.Next) {
    const { sort_by, sort_order, limit, page } = ctx.query;
    const datas = await this.getLoserListFlow.execute(
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }
}
