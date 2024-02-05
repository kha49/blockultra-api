import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Category }         from '../../../core/schemas/category';
import { Coin }             from '../../../core/schemas/home/coin';
import { CategoryVolumn }   from '../../../core/schemas/common/category-volume';

import { CategoryService }        from '../../../infrastructure/services/category.service';
import { CoinService }            from '../../../infrastructure/services/coin.service';
import { CategoryVolumnService }  from '../../../infrastructure/services/category-volumn.service';

import GetCategoryListFlow          from '../../../usecase/block-ultra/category/get-list-category.flow';
import GetCategoryFlow              from '../../../usecase/block-ultra/category/get-category.flow';
import GetCoinByCategoryFlow        from '../../../usecase/block-ultra/coin/get-coin-by-category.flow';
import GetCategoryVolumeFlow        from '../../../usecase/block-ultra/category-volume/get-category-volume.flow';
import SearchCategoryFilterFlow     from '../../../usecase/block-ultra/category/search-category-filter.flow';

import BusinessGainerLoser  from '../../../core/business/block-ultra/logic/gainer-loser.logic';


export class CategoryCtrl {
  private getCategorysFlow;
  private getCategoryFlow;
  private getCoinByCategoryFlow;
  private getCategoryVolumeFlow;
  private searchCategoryFilterFlow;

  constructor(private readonly em: EntityManager) {
    const categoryService       = new CategoryService(this.em.getRepository(Category));
    const coinService           = new CoinService(this.em.getRepository(Coin));
    const categoryVolumnService = new CategoryVolumnService(this.em.getRepository(CategoryVolumn));

    this.getCategorysFlow         = new GetCategoryListFlow(categoryService);
    this.getCategoryFlow          = new GetCategoryFlow(categoryService);
    this.getCoinByCategoryFlow    = new GetCoinByCategoryFlow(coinService);
    this.getCategoryVolumeFlow    = new GetCategoryVolumeFlow(categoryVolumnService);
    this.searchCategoryFilterFlow = new SearchCategoryFilterFlow(coinService);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by = sort_by ? sort_by : 'market_cap';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getCategorysFlow.execute(
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
    const { id, time } = ctx.query;
    const category       = await this.getCategoryFlow.execute(id as string);
    const categoryVolumn = await this.getCategoryVolumeFlow.execute( category.id, time as string );
    const gainerPercent  = BusinessGainerLoser.getGainerPercent( category.gainers, category.losers );
    const loserPercent   = BusinessGainerLoser.getLoserPercent(category.gainers);

    const result = { ...category, gainerPercent, loserPercent, categoryVolumn };
    ctx.status = 200;
    ctx.body = result;
  }

  async getCoinList(ctx: Koa.Context, _next: Koa.Next) {
    const { category_id, search_key, sort_by, sort_order, limit, page } = ctx.query;
    const coins = await this.getCoinByCategoryFlow.execute(
      parseInt(category_id as string),
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string),
      parseInt(page as string),
    );
    ctx.status = 200;
    ctx.body = coins;
  }

  async searchCategoryFilter(ctx: Koa.Context, _next: Koa.Next) {
    let { category_id, search_key } = ctx.query;
    const datas = await this.searchCategoryFilterFlow.execute(search_key as string, parseInt(category_id as string));
    ctx.status = 200;
    ctx.body = datas;
  }
}
