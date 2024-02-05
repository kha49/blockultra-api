import * as Koa from 'koa';
import { EntityManager } from 'typeorm';
import CrudUserFlow from '../../../../usecase/admin-cms/user/crud_user.flow';
import { CrudUserPresenter } from './presenters/crud_user.presenter';
import { validate } from 'class-validator';
import { ConstVariableUtil } from '../../../../core/utils/const.variable';
import ChangePasswordFlow from '../../../../usecase/admin-cms/user/change_password.flow';

export class CrudUserCtrl {
  private readonly flow: CrudUserFlow;
  private readonly changePasswordFlow: ChangePasswordFlow;
  constructor(private readonly entityManager: EntityManager) {
    this.flow = new CrudUserFlow(this.entityManager);
    this.changePasswordFlow = new ChangePasswordFlow(this.entityManager);
  }
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const { limit, page } = ctx.request.body as CrudUserPresenter;
    let res = await this.flow.list();
    if (res.status == 'error') {
      ctx.status = 400;
      ctx.body = ConstVariableUtil.STATUS_400;
    }
    const response = CrudUserPresenter.presentList(res.result);
    ctx.body = response;
    ctx.status = 200;
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const user = ctx.request.body as CrudUserPresenter;
    const validation = await validate(user);
    if (!validation) {
      ctx.status = 400;
      ctx.body = ConstVariableUtil.STATUS_400;
    }
    const { status, result } = await this.flow.create(user);
    if (status == 'error') {
      ctx.status = 400;
      ctx.body = ConstVariableUtil.STATUS_400;
    }
    ctx.body = { status, result };
  }

  async delete(ctx: Koa.Context, _next: Koa.Next) {
    const ids = ctx.request.body as number[];
    const { status, result } = await this.flow.deletes(ids);
    if (status == 'error') {
      ctx.status = 400;
      ctx.body = ConstVariableUtil.STATUS_400;
    }
    ctx.status = 200;
    ctx.body = result;
  }

  async changePassword(ctx: Koa.Context, _next: Koa.Next) {
    const access_token = ctx.cookies.get(ConstVariableUtil.ACCESS_TOKEN) || '';
    const pwd = ctx.request.body;
    const user = await this.changePasswordFlow.execute(pwd, access_token);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
      ctx.body = ConstVariableUtil.INVALID_TOKEN;
    }
  }

  async update(ctx: Koa.Context, _next: Koa.Next) {
    const { item } = ctx.query;
    const res = await this.flow.update(item);
    ctx.body = res;
  }
}
