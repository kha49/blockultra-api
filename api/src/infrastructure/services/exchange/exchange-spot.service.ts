import { Repository } from 'typeorm';
import { BaseService } from '../core/base.service';
import { ExchangeSpot } from '../../../core/schemas/exchange/exchange-spot';

export class ExchangeSpotService extends BaseService<ExchangeSpot> {
  constructor(private readonly repo: Repository<ExchangeSpot>) {
    super(repo);
  }
}
