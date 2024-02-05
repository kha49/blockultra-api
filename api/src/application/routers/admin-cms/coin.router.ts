import * as Koa from 'koa';
import { EntityManager } from 'typeorm';

import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { CmsCoinCtrl } from '../../../application/controllers/admin-cms/coin/coin.ctrl';

export function getCmsCoinRouter(em: EntityManager) {
  var ctrl = new CmsCoinCtrl(em);
  const routers = [
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coin',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.findOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.create(ctx, next);
      },
      method: 'post',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.update(ctx, next);
      },
      method: 'put',
    },
    {
      name: JSON.stringify([ConstVariableUtil.PROFILE_TYPE.ADMIN]),
      path: 'cms/coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.deletes(ctx, next);
      },
      method: 'delete',
    },
  ];
  return routers;
}
