import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { CrudUserCtrl } from '../../controllers/admin-cms/user/user.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getCmsFundraisingRouter(em: EntityManager) {
  const userCtrl = new CrudUserCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/fundraisings',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await userCtrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/fundraisings',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await userCtrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/fundraisings',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await userCtrl.update(ctx, next);
      },
      method: 'put',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/fundraisings',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await userCtrl.delete(ctx, next);
      },
      method: 'delete',
    },
  ];
  return routers;
}
