import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { IdoVolume } from '../../core/schemas/common/ido-volume';

export class IdoVolumnService extends BaseService<IdoVolume> {
  constructor(private readonly repo: Repository<IdoVolume>) {
    super(repo);
  }
}
