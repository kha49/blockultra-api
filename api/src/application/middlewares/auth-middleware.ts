import Koa from 'koa';
import BusinessPerm from '../../core/business/block-ultra/logic/perm.logic';
import { BcryptUtil } from '../../core/utils/bcrypt.util';
import { ConstVariableUtil } from '../../core/utils/const.variable';
import { CtrlUtil } from '../../core/utils/ctrl.util';

export class AuthMiddleware {
  public static async verifyAuth(
    ctx: Koa.DefaultContext,
    next: Function,
  ): Promise<void> {
    try {
      const httpMethod: string = ctx.request.method;
      let apiEndpoint = ctx.originalUrl.replace('/api/', '');
      if (httpMethod == 'GET') {
        apiEndpoint = apiEndpoint.split('?')[0];
      }

      const publicApis = CtrlUtil.getPublicApi();
      if (!publicApis.includes(apiEndpoint)) {
        let token: string = ctx.cookies.get(ConstVariableUtil.ACCESS_TOKEN);
        const { authorization } = ctx.headers;
        const payload = await AuthMiddleware.verifyToken(token, authorization);
        if (payload) {
          ctx.state.jwt = payload;
          const perms = payload;
          const isAccess = BusinessPerm.verifyPermission(
            perms,
            ctx.originalUrl,
          );
          if (isAccess) {
            await next();
          } else {
            ctx.status = 403;
            ctx.body = 'Forbidden';
          }
        } else {
          ctx.status = 401;
          ctx.body = 'Unauthenticated';
        }
      } else {
        await next();
      }
    } catch (e: any) {
      if (e.name === 'TokenExpiredError') {
        ctx.status = 401;
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt,
        )}.`;
      } else {
        ctx.status = 500;
        ctx.body = e;
      }
    }
  }

  private static async verifyToken(token: string, authorization: any) {
    var payload = null;
    if (!token) {
      if (!authorization) {
        return payload;
      }
      token = authorization.split(' ')[1];
    }
    payload = await BcryptUtil.verify(token);
    return payload;
  }
}
