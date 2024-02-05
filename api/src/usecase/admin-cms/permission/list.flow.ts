import { IPerm } from '../../../core/interfaces/core/perm.service';

export class ListPermFlow {
  constructor(private readonly service: IPerm) {}

  async execute() {
    const query = await this.service.getQueryBuilder('p');
    query.where('p.profile_types != :emptyProfileTypes', {
      emptyProfileTypes: '',
    });
    const perms = await query.getMany();
    return perms;
  }
}

export default ListPermFlow;
