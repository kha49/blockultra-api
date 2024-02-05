import { Entity, Column } from 'typeorm';
import { BaseSchema } from './core/base';

@Entity({ name: 'backers' })
export class Backer extends BaseSchema {
  @Column()
  id: number = 0;
  @Column({ nullable: true })
  slug: string = '';
  @Column({ nullable: true })
  name?: string;
  @Column({ nullable: true })
  logo?: string
  @Column({ nullable: true })
  created_by?: string
  @Column({ nullable: true })
  tier?: number;
  @Column({ nullable: true })
  type: string = '';
  @Column({ nullable: true })
  location: string = '';
  @Column({ nullable: true })
  leadInvestments: number = 0;
  @Column({ nullable: true })
  totalInvestments: number = 0;
  @Column({ nullable: true, type: 'json' })
  coins: string = '';
  @Column({ nullable: true, type: 'json' })
  socials: string = '';
  @Column({ nullable: true, type: 'json' })
  resources: string = '';
  @Column({ nullable: true, type: 'json' })
  description: string = '';
  @Column({ nullable: true })
  totalBalance: string = '';
  @Column({ nullable: true })
  unicorn: number = 0;
  @Column({ nullable: true })
  raised: string = '';
  @Column({ nullable: true })
  leadRounds: number = 0;
  @Column({ nullable: true })
  gainers: number = 0;
  @Column({ nullable: true })
  losers: number = 0;
  @Column({ nullable: true, type: 'json' })
  market_caps: string = "";
  @Column({ nullable: true })
  try_update_gainer: number = 0;
  @Column({ nullable: true })
  try_update_market_cap: number = 0;
  @Column({ nullable: true, type: 'text' })
  about: string = '';
}
