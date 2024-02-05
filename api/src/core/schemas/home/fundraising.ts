import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'fundraisings' })
export class Fundraising extends BaseSchema {

  @Column({ nullable: true, type: 'numeric' })
  announceDate: number = 0;

  @Column({ nullable: true })
  category: string = '';

  @Column({ nullable: true, type: 'numeric' })
  currencyId: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  fundsRaised: number = 0;

  @Column({ nullable: true })
  image: string = '';

  @Column({ nullable: true })
  inaccurateAnnounceDate: boolean = false;

  @Column({ nullable: true, type: 'json' })
  investors: string = '';

  @Column({ nullable: true, type: 'json' })
  leadInvestors: string = '';

  @Column({ nullable: true, type: 'json' })
  mainTag: string = '';

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true, type: 'numeric' })
  preValuation: number = 0;

  @Column({ nullable: true })
  preValuationInaccurate: boolean = false;

  @Column({ nullable: true })
  rank: number = 0
  
  @Column({ nullable: true })
  saleId: number = 0;

  @Column({ nullable: true })
  slug: string = '';

  @Column({ nullable: true })
  stage: string = '';

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ nullable: true })
  trading: boolean = false;

  @Column({ nullable: true, type: 'json' })
  tweetscout: string = '';

  @Column({ nullable: true, type: 'numeric' })
  tweetscoutScore: number = 0;

  @Column({ nullable: true, type: 'json' })
  ventureCapitals: string = '';
}
