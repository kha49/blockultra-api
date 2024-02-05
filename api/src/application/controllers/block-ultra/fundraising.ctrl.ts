import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { Coin }         from '../../../core/schemas/home/coin';
import { Fundraising }  from '../../../core/schemas/home/fundraising';
import { Backer }       from '../../../core/schemas/backer';
import { Category }     from '../../../core/schemas/category';

import { CoinService }          from '../../../infrastructure/services/coin.service';
import { FundraisingService }   from '../../../infrastructure/services/fundraising.service';
import { BackerService }        from '../../../infrastructure/services/backer.service';
import { CategoryService }      from '../../../infrastructure/services/category.service';

import GetCategoryListBackerFlow       from '../../../usecase/block-ultra/category/get-list-backer-category.flow';
import GetPortfolioListFlow            from '../../../usecase/block-ultra/fundraising/get-portfolio-list.flow';
import GetFundingRoundListFlow         from '../../../usecase/block-ultra/fundraising/get-backer-funding-rounds.flow';
import GetFundraisingListFlow          from '../../../usecase/block-ultra/fundraising/get-list-fundraising.flow';
import GetTopBackersFlow               from '../../../usecase/block-ultra/fundraising/get-top-backers.flow';
import GetBackerDetailFlow             from '../../../usecase/block-ultra/fundraising/get-backer-detail.flow';
import SearchFundingRoundFilterFlow    from '../../../usecase/block-ultra/fundraising/search-funding-round-filter.flow';
import SearchTopBackerFilterFlow       from '../../../usecase/block-ultra/fundraising/search-topbacker-filter.flow';
import SearchBackerPortfolioFilterFlow from '../../../usecase/block-ultra/fundraising/search-backer-portfolio-filter.flow';

export class FundraisingCtrl {
  private getPortfolioListFlow;
  private getFundraisingListFlow;
  private getTopBackersFlow;
  private getCategoryListFlow;
  private getFundingRoundListFlow;
  private getBackerDetailFlow;
  private fundingRoundSearchFlow;
  private topBackerSearchFlow;
  private backerPortfolioSearchFLow;
  private backerFundingRoundSearchFlow;

  constructor(private readonly em: EntityManager) {
    const coinService         = new CoinService(this.em.getRepository(Coin));
    const fundraisingService  = new FundraisingService(this.em.getRepository(Fundraising));
    const backerService       = new BackerService(this.em.getRepository(Backer));
    const categoryService     = new CategoryService(this.em.getRepository(Category));

    this.getCategoryListFlow          = new GetCategoryListBackerFlow(categoryService, fundraisingService);
    this.getFundraisingListFlow       = new GetFundraisingListFlow(fundraisingService);
    this.getTopBackersFlow            = new GetTopBackersFlow(backerService);
    this.getPortfolioListFlow         = new GetPortfolioListFlow(coinService);
    this.getFundingRoundListFlow      = new GetFundingRoundListFlow(fundraisingService);
    this.getBackerDetailFlow          = new GetBackerDetailFlow(backerService);
    this.fundingRoundSearchFlow       = new SearchFundingRoundFilterFlow(fundraisingService);
    this.topBackerSearchFlow          = new SearchTopBackerFilterFlow(backerService);
    this.backerPortfolioSearchFLow    = new SearchBackerPortfolioFilterFlow(coinService);
    this.backerFundingRoundSearchFlow = new SearchFundingRoundFilterFlow(fundraisingService);
  }

  async list(ctx: Koa.Context, _next: Koa.Next) {
    let { search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_by = sort_by ? sort_by : 'announceDate';
    sort_order = sort_order ? sort_order : 'desc';
    const datas = await this.getFundraisingListFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    ctx.status = 200;
    ctx.body = datas;
  }

  async getTopBacker(ctx: Koa.Context, _next: Koa.Next) {
    let { sort_by, sort_order, limit, page, search_key } = ctx.query;
    sort_by = sort_by ? sort_by : 'tier,totalInvestments';
    sort_order = sort_order ? sort_order : 'asc';
    const datas = await this.getTopBackersFlow.execute(
      search_key as string,
      sort_by as string,
      sort_order as 'asc' | 'desc',
      parseInt(limit as string) || 10,
      parseInt(page as string) || 1,
    );
    
    ctx.status = 200;
    ctx.body = datas;
  }

  async getBackerDetail(ctx: Koa.Context, _next: Koa.Next) {
    let { backer_id } = ctx.query;
    const backer      = await this.getBackerDetailFlow.execute(parseInt(backer_id as string));
    const categories  = await this.getCategoryListFlow.execute( backer.slug as string); 
    const result = { ...backer, categories };
    ctx.status = 200;
    ctx.body = result;
  } 

  async getBackerFundingRounds(ctx: Koa.Context, _next: Koa.Next) {
    let { slug, search_key, sort_by, sort_order, limit, page } = ctx.query; 
    sort_by = sort_by ? sort_by : 'announceDate';
    sort_order = sort_order ? sort_order : 'desc';
    const funding_rounds = await this.getFundingRoundListFlow.execute({ 
          slug: slug as string, 
          search_key: search_key as string, 
          sort_by: sort_by as string, 
          sort_order: sort_order as "asc" | "desc",
          limit: parseInt(limit as string),
          page: parseInt(page as string)
    });
    ctx.status = 200;
    ctx.body = funding_rounds;
  }

  async getBackerPortfolios(ctx: Koa.Context, _next: Koa.Next) {
    let {  backer_id, search_key, sort_by, sort_order, limit, page } = ctx.query;
    sort_by = sort_by ? sort_by : 'marketCap';
    sort_order = sort_order ? sort_order : 'asc';
    const portfolios = await this.getPortfolioListFlow.execute({ 
          backer_id: parseInt(backer_id as string), 
          search_key: search_key as string, 
          sort_by: sort_by as string, 
          sort_order: sort_order as "asc" | "desc",
          limit: parseInt(limit as string),
          page: parseInt(page as string)
    }); 
    ctx.status = 200;
    ctx.body = portfolios;
  }

  async fundingRoundSearch(ctx: Koa.Context, _next: Koa.Next) {
    let { key } = ctx.query;
    const datas = await this.fundingRoundSearchFlow.execute(key as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async topBackerSearch(ctx: Koa.Context, _next: Koa.Next) {
    let { slug } = ctx.query;
    const datas = await this.topBackerSearchFlow.execute(slug as string);
    ctx.status = 200;
    ctx.body = datas;
  }

  async backerPortfolioSearch(ctx: Koa.Context, _next: Koa.Next) {
    let { key, backer_id } = ctx.query;
    const datas = await this.backerPortfolioSearchFLow.execute(key as string, parseInt(backer_id as string));
    ctx.status = 200;
    ctx.body = datas;
  }

  async backerFundingRoundSearch(ctx: Koa.Context, _next: Koa.Next) {
    let { key } = ctx.query;
    const datas = await this.backerFundingRoundSearchFlow.execute(key as string);
    ctx.status = 200;
    ctx.body = datas;
  }
}
