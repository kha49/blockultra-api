import * as Koa from 'koa';

import { ConstVariableUtil } from '../../../core/utils/const.variable';
import { FileCtrl } from '../../../application/controllers/core/file/file.ctrl';

export function getFileRouter() {
  var ctrl = new FileCtrl();
  const routers = [
    {
      name: ConstVariableUtil.PROFILE_TYPE.ADMIN,
      path: 'file/upload',
      ctrl: async (ctx: Koa.Context, next: Koa.Next) => {
        await ctrl.upload(ctx, next);
      },
      method: 'post',
    },
  ];
  return routers;
}
