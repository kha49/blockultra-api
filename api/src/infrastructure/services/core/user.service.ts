import { Repository } from 'typeorm'; 
import { User } from '../../../core/schemas/core/user';
import { BaseService } from './base.service';

export class UserService extends BaseService<User> {
  constructor(private readonly repo: Repository<User>) {
    super(repo);
  }
}
