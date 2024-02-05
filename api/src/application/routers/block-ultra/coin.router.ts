import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { CoinCtrl } from '../../controllers/block-ultra/coin.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getCoinRouter(em: EntityManager) {
  const coinCtrl = new CoinCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getListCoin(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin/detail',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.findOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coins/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.search(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin-unlock',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getCoinUnlock(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin-fundraising',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getCoinFundraising(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin-tokenomic',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getCoinTokenomics(ctx, next);
      },
      method: 'get', 
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin-ieoido',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getCoinIeoIdo(ctx, next);
      },
      method: 'get', 
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'market/spot/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.searchMarketSpot(ctx, next);
      },
      method: 'get', 
    },{
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'market/historicals',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getMarketHistorical(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'market/spots',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getMarketSpot(ctx, next);
      },
      method: 'get',
    }, 
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'coin-key-list',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await coinCtrl.getAllCoinKey(ctx, next);
      },
      method: 'get',
    } 
  ];
  return routers;
}
