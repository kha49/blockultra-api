import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { IeoIdoCtrl } from '../../controllers/block-ultra/ieo-ido.ctrl';
import { ConstVariableUtil } from '../../../core/utils/const.variable';

export function getIeoIdoRouter(em: EntityManager) {
  var ctrl = new IeoIdoCtrl(em);
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.list(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido/top-launch-pad',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.listTopIdoLaunchPad(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'launch-pad-detail',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getLaunchPad(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'launch-pad-projects',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.getLaunchPadProject(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'launch-pad-project/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchLaunchPadProject(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido/upcoming/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchIeoIdoUpComing(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido/ended/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchIeoIdoEnded(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido/top-ido-launch-pad/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.searchIeoIdoTopIdoLaunchPad(ctx, next);
      },
      method: 'get',
    },
    {
      name: ConstVariableUtil.PROFILE_TYPE.PUBLIC,
      path: 'ieo-ido/search',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.search(ctx, next);
      },
      method: 'get',
    }
  ];
  return routers;
}
