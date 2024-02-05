import { IRole } from '../../../core/interfaces/core/role.service';

export class CrudRoleFlow {
  constructor(private readonly service: IRole) {}
  async getAll() {
    const query = await this.service.getQueryBuilder('p');
    query.where('p.id != 1');
    query.leftJoinAndSelect('p.permissions', 'permissions');
    const roles = await query.getMany();
    return roles;
  }

  async create(role: any) {
    const result = await this.service.create(role);
    return result;
  }
}

export default CrudRoleFlow;
