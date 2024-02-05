import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'home_gainers' })
export class Gainer extends BaseSchema {
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
  @Column({ nullable: true, type: 'json' })
  rankHistory: string = '';
  @Column({ nullable: true, type: 'json' })
  athMarketCap: string = '';
  @Column({ nullable: true })
  lifeCycle: string = '';
  @Column({ nullable: true })
  unlimitedSupply: boolean = false;
  @Column({ nullable: true, type: 'numeric' })
  maxSupply: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  totalSupply: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  percentOfCircSupply: number = 0;
  @Column({ nullable: true, type: 'json' })
  image: string = '';
  @Column({ nullable: true, type: 'json' })
  tokens: string = '';
  @Column({ nullable: true })
  category: string = '';
  @Column({ nullable: true })
  categoryId: number = 0;
  @Column({ nullable: true, type: 'json' })
  tagIds: string = '';
  @Column({ nullable: true, type: 'json' })
  fundIds: string = '';
  @Column({ nullable: true })
  interest: string = '';
  @Column({ nullable: true })
  isTraded: boolean = false;
  @Column({ nullable: true })
  marketDataNotAvailable: boolean = false;
  @Column({ nullable: true })
  vesting: string = '';
  @Column({ nullable: true })
  hasVesting: boolean = false;
  @Column({ nullable: true })
  listingDate: string = '';
  @Column({ nullable: true, type: 'json' })
  athPrice: string = '';
  @Column({ nullable: true, type: 'json' })
  icoData: string = '';
  @Column({ nullable: true, type: 'numeric' })
  icoFullyDilutedMarketCap: number = 0;
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

  @Column({ nullable: true, type: 'json' })
  volatility: string = '';

  @Column({ nullable: true, type: 'numeric' })
  price: number = 0;

  @Column({ nullable: true, type: 'json' })
  histPrices: string = '';

  @Column({ nullable: true, type: 'json' })
  atlPrice: string = '';

  @Column({ nullable: true })
  icoStatus: string = '';

  @Column({ nullable: true, type: 'numeric' })
  initialSupply: number = 0;
  
  @Column({ nullable: true, type: 'numeric' })
  initialMarketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  average24: number = 0;
}
