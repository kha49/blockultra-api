import { Repository } from 'typeorm';
import { Global } from '../../../core/schemas/common/global';

export class HeaderBarRuningFlow {
  constructor(private readonly repo: Repository<Global>) {}

  async execute() {
    const result = await this.repo.find({
      order: { created_at: 'DESC' },
      take: 1,
    });
    return result[0];
  }
}

export default HeaderBarRuningFlow;
