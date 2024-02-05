import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Wallet } from '../../core/schemas/cms/wallet';

export class WalletService extends BaseService<Wallet> {
  constructor(private readonly repo: Repository<Wallet>) {
    super(repo);
  }
}
