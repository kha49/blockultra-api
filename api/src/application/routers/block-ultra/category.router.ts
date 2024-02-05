import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { CategoryCtrl } from '../../controllers/block-ultra/category.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getCategoryRouter(em: EntityManager) {
  var ctrl = new CategoryCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'category',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.findOne(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'categories',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'category/coins',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getCoinList(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'categories/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchCategoryFilter(ctx, next);
      },
      method: 'get',
    }
  ];
  return routers;
}
