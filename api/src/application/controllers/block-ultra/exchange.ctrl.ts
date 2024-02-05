import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { ExchangeSpot }       from '../../../core/schemas/exchange/exchange-spot';
import { Coin }               from '../../../core/schemas/home/coin';
import { ExchangeDetailSpot } from '../../../core/schemas/exchange/exchange-detail-spot';

import { ExchangeDetailSpotService }  from '../../../infrastructure/services/exchange/exchange-detail-spot.service';
import { CoinService }                from '../../../infrastructure/services/coin.service';

import GetExchangeDetailSpotFlow  from '../../../usecase/block-ultra/exchange/get-exchange-detail-spot.flow';
import GetListExchangeFlow        from '../../../usecase/block-ultra/exchange/get-list-exchange.flow';
import GetExchangeFlow            from '../../../usecase/block-ultra/exchange/get-exchane.flow';
import SearchExchangeSpotFlow     from '../../../usecase/block-ultra/exchange/search-exchange-spot.flow';
import BusinessExchange           from '../../../core/business/block-ultra/logic/exchange.logic';
import { ExchangeSpotService }    from '../../../infrastructure/services/exchange/exchange-spot.service';

export class ExchangeCtrl {
  private getExchangesFlow;
  private getExchangeFlow;
  private getExchangeDetailSpotFlow;
  private searchExchangeSpotFlow;
  private exchangeSpotService;
  private coinService;
  private exchangeDetailSpotService;

  constructor(private readonly em: EntityManager) {
    this.exchangeSpotService        = new ExchangeSpotService(this.em.getRepository(ExchangeSpot));
    this.exchangeDetailSpotService  = new ExchangeDetailSpotService(this.em.getRepository(ExchangeDetailSpot));
    this.coinService                = new CoinService(this.em.getRepository(Coin));

    this.getExchangesFlow          = new GetListExchangeFlow(this.exchangeSpotService);
    this.getExchangeFlow           = new GetExchangeFlow(this.exchangeSpotService);
    this.getExchangeDetailSpotFlow = new GetExchangeDetailSpotFlow(this.exchangeDetailSpotService);
    this.searchExchangeSpotFlow    = new SearchExchangeSpotFlow(this.exchangeSpotService);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'volume24h';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getExchangesFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async findOne(ctx: Koa.Context, _next: Koa.Next) {
    const { key } = ctx.query;
    const exchange = await this.getExchangeFlow.execute(key as string);
    const coin     = exchange.nativeCoinKey ? await this.coinService.findByCoinKey(exchange.nativeCoinKey): null;
    const datas    = await this.exchangeDetailSpotService.getExchangeDetailSpot(key as string);
    const result   = BusinessExchange.getAllocations(datas);
    const response = BusinessExchange.getExchangeDetail(exchange, result.allocations, result.totalCoins, coin); 
    ctx.status = 200;
    ctx.body = response;
  }

  async getSpots(ctx: Koa.Context, _next: Koa.Next) {
    let { key, sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by    = sort_by    ? sort_by    : 'usdvolume';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getExchangeDetailSpotFlow.execute(
      key as string,
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async searchExchangeSpot(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key } = ctx.query;
    const datas = await this.searchExchangeSpotFlow.execute(search_key as string);
    ctx.status = 200;
    ctx.body = datas;
  }
}
