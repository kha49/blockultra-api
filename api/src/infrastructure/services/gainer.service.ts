import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Gainer } from '../../core/schemas/home/gainer';

export class GainerService extends BaseService<Gainer> {
  constructor(private readonly repo: Repository<Gainer>) {
    super(repo);
  }
}
