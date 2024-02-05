import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Loser } from '../../core/schemas/home/loser';

export class LoserService extends BaseService<Loser> {
  constructor(private readonly repo: Repository<Loser>) {
    super(repo);
  }
}
