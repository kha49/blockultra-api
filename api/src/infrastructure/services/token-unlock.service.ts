import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { TokenUnlock } from '../../core/schemas/unlock/token-unlock';

export class TokenUnlockService extends BaseService<TokenUnlock> {
  constructor(private readonly repo: Repository<TokenUnlock>) {
    super(repo);
  }

  async getTokenUnlock(coin_key: string): Promise<any> {
    const query = this.repo.createQueryBuilder('t');
    query.where({ key: coin_key });
    query.select([
      't.lockedTokensPercent',
      't.unlockedTokensPercent',
      't.nextUnlockPercent',
      't.nextUnlocks',
    ]);
    const result = await query.getRawOne();
    if (result) {
      return {
        chart: {
          lockedTokensPercent   : result.t_lockedTokensPercent   ? parseFloat(result.t_lockedTokensPercent)   : 0,
          unlockedTokensPercent : result.t_unlockedTokensPercent ? parseFloat(result.t_unlockedTokensPercent) : 0,
          nextUnlockPercent     : result.t_nextUnlockPercent     ? parseFloat(result.t_nextUnlockPercent)     : 0,
        },
        nextUnlocks: result.t_nextUnlocks,
      };
    } else {
      return null;
    }
  }
}
