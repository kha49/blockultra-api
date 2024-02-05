import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { TrendingCtrl } from '../../controllers/block-ultra/trending.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getTrendingRouter(em: EntityManager) {
  var ctrl = new TrendingCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'trendings',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
