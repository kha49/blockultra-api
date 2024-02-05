import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Launchpad } from '../../core/schemas/cms/launchpad';

export class LaunchpadService extends BaseService<Launchpad> {
  constructor(private readonly repo: Repository<Launchpad>) {
    super(repo);
  }
}
