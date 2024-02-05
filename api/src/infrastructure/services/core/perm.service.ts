import { Repository } from 'typeorm';
import { BaseService } from './base.service';
import { Perm } from '../../../core/schemas/core/perm';

export class PermService extends BaseService<Perm> {
  constructor(private readonly repo: Repository<Perm>) {
    super(repo);
  }

  async verifyPerm(userId: number) {
    var query = this.repo.createQueryBuilder('perm');
    query
      .innerJoin('roles_perms', 'gp', 'gp.perm_id = perm.id')
      .innerJoin('roles', 'g', 'g.id = gp.role_id')
      .innerJoin('roles_users', 'gu', 'gu.role_id = g.id')
      .where('gu.user_id = :userId', { userId })
      .andWhere("perm.profile_types != ''");
    const perms = await query.getMany();
    return perms || false;
  }
}
