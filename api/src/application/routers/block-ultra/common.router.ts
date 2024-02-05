import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { CommonCtrl } from '../../controllers/block-ultra/common.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getCommonRouter(em: EntityManager) {
  var commonCtrl = new CommonCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'global-search-coin',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await commonCtrl.globalSearchCoin(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'header-bar-runing',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await commonCtrl.headerBarRuning(ctx, next);
      },
      method: 'get',
    },
  ];
  return routers;
}
