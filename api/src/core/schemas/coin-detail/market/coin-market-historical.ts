import { Column, Entity } from 'typeorm';
import { BaseSchema } from '../../core/base';

@Entity({ name: 'coin_market_historicals' })
export class CoinMarketHistorical extends BaseSchema {
  @Column()
  coinKey: string = '';

  @Column({ nullable: true })
  date: Date = new Date();

  @Column({ nullable: true, type: 'numeric' })
  low: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  high: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  open: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  close: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  avg: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  marketcap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  volume: number = 0;
}
