import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { CrudUserCtrl } from '../../controllers/admin-cms/user/user.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getCmsExchangeRouter(em: EntityManager) {
  const ctrl = new CrudUserCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/exchanges',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/exchanges',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/exchanges',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.update(ctx, next);
      },
      method: 'put',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/exchanges',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.delete(ctx, next);
      },
      method: 'delete',
    },
  ];
  return routers;
}
