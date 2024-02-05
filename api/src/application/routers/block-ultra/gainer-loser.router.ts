import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { GainerLoserCtrl } from '../../controllers/block-ultra/gainer-loser.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getGainerLoserRouter(em: EntityManager) {
  const ctrl = new GainerLoserCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'gainers',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getListGainer(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'losers',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getListLoser(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
