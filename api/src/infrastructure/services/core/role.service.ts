import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { Role } from '../../../core/schemas/core/role';

export class RoleService extends BaseService<Role> {
  constructor(private readonly repo: Repository<Role>) {
    super(repo);
  }
}
