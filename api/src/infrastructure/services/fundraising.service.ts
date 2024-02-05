import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Fundraising } from '../../core/schemas/home/fundraising';

export class FundraisingService extends BaseService<Fundraising> {
  constructor(private readonly repo: Repository<Fundraising>) {
    super(repo);
  }
}
