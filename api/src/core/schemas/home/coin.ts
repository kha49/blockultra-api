import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'coins' })
export class Coin extends BaseSchema {
  @Column({ unique: true })
  key: string = '';

  @Column({ nullable: true })
  rank: number = 0;

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  hasFundingRounds: boolean = false;

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ nullable: true })
  type: string = '';

  @Column({ type: 'json', nullable: true })
  rankHistory: string = '';

  @Column({ type: 'json', nullable: true })
  athMarketCap: string = '';

  @Column({ nullable: true })
  lifeCycle: string = '';

  @Column({ nullable: true, type: 'numeric' })
  maxSupply: number = 0;

  @Column({ nullable: true })
  unlimitedSupply: boolean = false;

  @Column({ nullable: true, type: 'numeric' })
  totalSupply: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  percentOfCircSupply: number = 0;

  @Column({ type: 'json', nullable: true })
  image: string = '';

  @Column({ type: 'json', nullable: true })
  tokens: string = '';

  @Column({ nullable: true })
  category: string = '';

  @Column({ nullable: true, type: 'numeric' })
  categoryId: number = 0;

  @Column({ type: 'json', nullable: true })
  tagIds: string = '';

  @Column({ type: 'json', nullable: true })
  interest: string = '';

  @Column({ nullable: true })
  isTraded: boolean = false;

  @Column({ nullable: true })
  marketDataNotAvailable: boolean = false;

  @Column({ type: 'json', nullable: true })
  vesting: string = '';

  @Column({ nullable: true })
  hasVesting: boolean = false;

  @Column({ nullable: true })
  listingDate: string = '';

  @Column({ type: 'json', nullable: true })
  athPrice: string = '';

  @Column({ type: 'json', nullable: true })
  icoData: string = '';

  @Column({ nullable: true })
  icon: string = '';

  @Column({ nullable: true, type: 'numeric' })
  fullyDilutedMarketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  availableSupply: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  marketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  volume24h: number = 0;

  @Column({ nullable: true })
  noData: boolean = false;

  @Column({ type: 'json', nullable: true })
  volatility: string = '';

  @Column({ nullable: true, type: 'numeric' })
  price: number = 0;

  @Column({ type: 'json', nullable: true })
  histPrices: string = '';

  @Column({ type: 'json', nullable: true })
  atlPrice: string = '';
  
  @Column({ type: 'json', nullable: true })
  fundIds: string = '';
  
  @Column({ nullable: true })
  chart: string = '';

  @Column({ type: 'json', nullable: true })
  links: string = '';

  @Column({ nullable: true })
  description: string = '';

  @Column({ type: 'json', nullable: true })
  histData: string = '';

  @Column({ nullable: true, type: 'numeric' })
  icoFullyDilutedMarketCap: number = 0;

  @Column({ nullable: true })
  icoStatus: string = '';
  
}
