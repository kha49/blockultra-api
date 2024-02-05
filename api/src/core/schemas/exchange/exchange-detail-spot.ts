import { BaseSchema } from '../../../core/schemas/core/base';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'exchange_detail_spot' })
export class ExchangeDetailSpot extends BaseSchema {
  @Column({ nullable: true })
  id: number = 0;

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ nullable: true })
  from: string = '';

  @Column({ nullable: true })
  to: string = '';

  @Column({ nullable: true, type: 'json' })
  fromCoin: string = '';

  @Column({ nullable: true, type: 'json' })
  toCoin: string = '';

  @Column({ nullable: true, type: 'numeric' })
  last: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  usdLast: number = 0;

  @Column({ nullable: true })
  coinName: string = '';

  @Column({ nullable: true })
  coinKey: string = '';

  @Column({ nullable: true })
  url: string = '';

  @Column({ nullable: true })
  hasHistory: boolean = false;

  @Column({ nullable: true })
  exchangeKey: string = '';

  @Column({ nullable: true })
  exchangeName: string = '';

  @Column({ nullable: true })
  exchangeIcon: string = '';

  @Column({ nullable: true })
  exchangeGroup: string = '';

  @Column({ nullable: true })
  exchangeRefText: string = '';

  @Column({ nullable: true })
  exchangeRefLink: string = '';

  @Column({ nullable: true, type: 'numeric' })
  high: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  low: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  open: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  close: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  bid: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  ask: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  baseVolume: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  usdVolume: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  btcVolume: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  change: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  changePercent: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  spread: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  exchangePercentVolume: number = 0;
}
