import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { ExchangeCtrl } from '../../controllers/block-ultra/exchange.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getExchangeRouter(em: EntityManager) {
  var ctrl = new ExchangeCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'exchanges',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'exchange',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.findOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'exchange/spots',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getSpots(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'exchanges/spots/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchExchangeSpot(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
