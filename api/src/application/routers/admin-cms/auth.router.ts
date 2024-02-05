 
import * as Koa from 'koa';
import { EntityManager } from 'typeorm'; 
 
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { AuthCtrl } from '../../controllers/core/auth/auth.ctrl';

export function getAuthRouter(em: EntityManager) {
  var authCtrl = new AuthCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'auth/refresh-token',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await authCtrl.login(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'auth/logout',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await authCtrl.login(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'auth/login',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await authCtrl.login(ctx, next);
      },
      method: 'post', 
    },
  ];
  return routers;
}
