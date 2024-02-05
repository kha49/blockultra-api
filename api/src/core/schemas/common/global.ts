import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'globals' })
export class Global extends BaseSchema {
  @Column({ nullable: true, type: 'numeric' })
  allCurrencies: string = '';

  @Column({ nullable: true, type: 'numeric' })
  btcDominanceChangePercent: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalVolume24h: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalMarketCapChangePercent: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalVolume24hChangePercent: string = '';

  @Column({ nullable: true, type: 'numeric' })
  btcDominance: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalMarketCap: string = '';

  @Column({ nullable: true, type: 'json' })
  gas: string = '';

  @Column({ nullable: true, type: 'json' })
  fear_greed: string  = "";
}
