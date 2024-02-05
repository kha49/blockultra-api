import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { FundraisingCtrl } from '../../controllers/block-ultra/fundraising.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getFundraisingRouter(em: EntityManager) {
  var ctrl = new FundraisingCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'top-backers',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getTopBacker(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'funding-rounds',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'fundraisings/backer',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getBackerDetail(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'funding-rounds/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.fundingRoundSearch(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'top-backers/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.topBackerSearch(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'fundraising/backer/portfolios',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getBackerPortfolios(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'fundraising/backer/funding-round',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getBackerFundingRounds(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'backer/portfolio/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.backerPortfolioSearch(ctx, next);
      },
      method: 'get',
    },

    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'backer/funding-round/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.backerFundingRoundSearch(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
