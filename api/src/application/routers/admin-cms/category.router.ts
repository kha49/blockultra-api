import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { CmsCategoryCtrl } from '../../../application/controllers/admin-cms/category/category.ctrl';

export function getCmsCategoryRouter(em: EntityManager) {
  var ctrl = new CmsCategoryCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/categories',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/categories',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/categories',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.deletes(ctx, next);
      },
      method: 'delete',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/categories',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.update(ctx, next);
      },
      method: 'put',
    },
  ];
  return routers;
}
