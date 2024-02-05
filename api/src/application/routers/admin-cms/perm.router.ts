import * as Koa from 'koa';
import { EntityManager } from 'typeorm';  
import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { PermCtrl } from '../../controllers/core/perm/perm.ctrl';

export function getPermRouter(em: EntityManager) {
  var permCtrl = new PermCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/perms',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await permCtrl.list(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
