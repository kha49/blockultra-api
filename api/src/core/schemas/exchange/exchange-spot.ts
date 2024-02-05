import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'exchange_spot' })
export class ExchangeSpot extends BaseSchema {
  @Column({ nullable: true })
  key: string = '';

  @Column({ nullable: true })
  icon: string = '';

  @Column({ nullable: true })
  id: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  num: number = 0;

  @Column({ nullable: true })
  _group: string = '';

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true, type: 'numeric' })
  currenciesCount?: number;

  @Column({ nullable: true, type: 'numeric' })
  pairsCount?: number;

  @Column({ nullable: true, type: 'numeric' })
  openInterest?: number;

  @Column({ nullable: true })
  isPromoted?: boolean;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true, type: 'json' })
  tokenPlatforms?: string;

  @Column({ nullable: true, type: 'json' })
  volumes?: string = '';

  @Column({ nullable: true, type: 'json' })
  reportedVolumes?: string = '';

  @Column({ nullable: true, type: 'numeric' })
  percentVolume?: number;

  @Column({ nullable: true, type: 'json' })
  dataChart?: string;

  @Column({ nullable: true, type: 'numeric' })
  foundationYear?: number;

  @Column({ nullable: true, type: 'numeric' })
  reserves?: number;

  @Column({ nullable: true })
  nativeCoinKey?: string;

  @Column({ nullable: true, type: 'json' })
  links?: string = '';

  @Column({ nullable: true, type: 'numeric' })
  volume24h?: number;
}
