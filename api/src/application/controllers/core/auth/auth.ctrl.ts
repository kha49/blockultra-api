import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import { validate } from 'class-validator';
import { AuthPresenter } from './account.presenter';
import { ConstVariableUtil } from '../../../../core/utils/const.variable';
 
import { UserService } from '../../../../infrastructure/services/core/user.service';
import { User } from '../../../../core/schemas/core/user';
import AuthFlow from '../../../../usecase/admin-cms/auth/auth.flow';

export class AuthCtrl {
  private readonly flow: AuthFlow;
  constructor(private readonly em: EntityManager) {
    const userService = new UserService(this.em.getRepository(User));
    this.flow = new AuthFlow(userService);
  }

  async login(ctx: Koa.Context, _next: Koa.Next) {
    const { username, password } = ctx.request.body as AuthPresenter;

    const isValid = await validate({ username, password });
    if (!isValid) {
      ctx.status = 400;
      ctx.body = 'bad request!';
    }
    const { status, result } = await this.flow.login(username, password);
    if (status == 'error') {
      ctx.status = 400;
      ctx.body = 'bad request!';
    } else {
      var user = AuthPresenter.presentItem(result.user);
      const { accessToken, refreshToken } = result;
      // ctx.cookies.set(ConstVariableUtil.ACCESS_TOKEN, accessToken, {
      //   httpOnly: true,
      // });
      // ctx.cookies.set(ConstVariableUtil.REFRESH_TOKEN, refreshToken, {
      //   httpOnly: true,
      // });
      ctx.body = { user, accessToken, refreshToken };
    }
  }

  async refreshToken(ctx: Koa.Context, _next: Koa.Next) {
    const access_token = ctx.cookies.get(ConstVariableUtil.ACCESS_TOKEN) || '';
    const refresh_token =
      ctx.cookies.get(ConstVariableUtil.REFRESH_TOKEN) || '';
    if (!refresh_token || !access_token) {
      ctx.status = 400;
      ctx.body = 'bad request!';
    }
    const { status, result } = await this.flow.refreshToken(
      access_token,
      refresh_token,
    );
    if (status === 'error') {
      ctx.status = 400;
      ctx.body = 'bad request!';
    }
    ctx.cookies.set(ConstVariableUtil.ACCESS_TOKEN, result, {
      httpOnly: true,
    });
    ctx.body = 'success!';
  }

  async logout(ctx: Koa.Context, _next: Koa.Next) {
    ctx.cookies.set(ConstVariableUtil.ACCESS_TOKEN, null, {
      httpOnly: true,
    });
    ctx.body = 'success!';
  }
}
