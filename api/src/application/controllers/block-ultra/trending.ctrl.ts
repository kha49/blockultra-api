import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Trending } from '../../../core/schemas/home/trending';
import GetTrendingListFlow from '../../../usecase/block-ultra/home/get-list-trending.flow';
import { TrendingService } from '../../../infrastructure/services/trending.service';

export class TrendingCtrl {
  private getTrendingListFlow;
  constructor(private readonly em: EntityManager) {
    const trendingService    = new TrendingService(this.em.getRepository(Trending));
    this.getTrendingListFlow = new GetTrendingListFlow(trendingService);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    const { limit, page } = ctx.query; 
    const datas = await this.getTrendingListFlow.execute(
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }
}
