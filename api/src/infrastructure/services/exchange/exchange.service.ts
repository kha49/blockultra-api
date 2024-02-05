import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service'; 
import { Exchange } from '../../../core/schemas/cms/exchange';

export class ExchangeService extends BaseService<Exchange> { 
  constructor(private readonly repo: Repository<Exchange>) {
    super(repo); 
  }
 
}
