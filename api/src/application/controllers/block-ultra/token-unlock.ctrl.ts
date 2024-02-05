import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { TokenUnlockService }           from '../../../infrastructure/services/token-unlock.service';
import { IeoIdoTopIdoLaunchPadService } from '../../../infrastructure/services/ieo-ido-top-ido-launch-pad.service';
 
import { IeoIdoTopIdoLaunchPad } from '../../../core/schemas/ieo-ido/ieo-ido-top-ido-launch-pad';
import { TokenUnlock }           from '../../../core/schemas/unlock/token-unlock';

import GetTokenUnlockFlow      from '../../../usecase/block-ultra/unlock/get-token-unlock.flow';
import GetListTokenUnlockFlow  from '../../../usecase/block-ultra/unlock/get-list-token-unlock.flow';
import SearchUnlockFlow        from '../../../usecase/block-ultra/unlock/search-token-unlock.flow';
import GetHeadTokenUnlockFLow  from '../../../usecase/block-ultra/unlock/get-head-token-unlock.flow';


export class TokenUnlockCtrl {
  private getTokenUnlocksFlow;
  private getTokenUnlockFlow;
  private searchUnlockFlow;
  private getHeadTokenUnlockFLow;

  constructor(private readonly em: EntityManager) {
    const tokenUnlockService           = new TokenUnlockService(this.em.getRepository(TokenUnlock));
    const ieoIdoTopIdoLaunchPadService = new IeoIdoTopIdoLaunchPadService(this.em.getRepository(IeoIdoTopIdoLaunchPad));
    
    this.getTokenUnlocksFlow    = new GetListTokenUnlockFlow(tokenUnlockService);
    this.getTokenUnlockFlow     = new GetTokenUnlockFlow(tokenUnlockService);
    this.searchUnlockFlow       = new SearchUnlockFlow(ieoIdoTopIdoLaunchPadService);
    this.getHeadTokenUnlockFLow = new GetHeadTokenUnlockFLow(tokenUnlockService,);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by     =  !sort_by ? "date" : sort_by;
    sort_order  = !sort_order ? "asc": sort_order;
    const datas = await this.getTokenUnlocksFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getHeadTokenUnlock(ctx: Koa.Context, _next: Koa.Next) {
    const datas = await this.getHeadTokenUnlockFLow.execute();
    ctx.status = 200;
    ctx.body = datas;
  }

  async getOne(ctx: Koa.Context, _next: Koa.Next) {
    const { key } = ctx.query;
    const datas = await this.getTokenUnlockFlow.execute(key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async search(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;

    const datas = await this.searchUnlockFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }
}
