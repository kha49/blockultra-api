import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { RoleCtrl } from '../../controllers/admin-cms/role/role.ctrl';

export function getRoleRouter(em: EntityManager) {
  var roleCtrl = new RoleCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/roles',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await roleCtrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/roles',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await roleCtrl.create(ctx, next);
      },
      method: 'post',
    },
  ];
  return routers;
}
