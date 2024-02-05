import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { IeoIdoProject } from '../../core/schemas/ieo-ido/ieo-ido-project';

export class IeoIdoProjectService extends BaseService<IeoIdoProject> {
  constructor(private readonly repo: Repository<IeoIdoProject>) {
    super(repo);
  }
}
