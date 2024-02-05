import * as Koa from 'koa';
import { EntityManager } from 'typeorm'; 
import CrudRoleFlow from '../../../../usecase/admin-cms/permission/crud_role.flow';
import { Role } from '../../../../core/schemas/core/role';
import { RoleService } from '../../../../infrastructure/services/core/role.service';
import { CrudRolePresenter } from './presenters/crud_user.presenter';

export class RoleCtrl {
  private readonly flow: CrudRoleFlow;
  constructor(private readonly em: EntityManager) {
    const service = new RoleService(this.em.getRepository(Role));
    this.flow = new CrudRoleFlow(service);
  }
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const result = await this.flow.getAll();
    ctx.body = result;
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const role = ctx.request.body as CrudRolePresenter;
    const result = await this.flow.create(role);
    ctx.body = result;
  }
}
