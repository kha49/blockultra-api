import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { TokenUnlockCtrl } from '../../controllers/block-ultra/token-unlock.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getTokenUnlockRouter(em: EntityManager) {
  var ctrl = new TokenUnlockCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'token-unlocks',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'token-unlock',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'token-unlocks/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.search(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'token-unlock-head',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getHeadTokenUnlock(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
