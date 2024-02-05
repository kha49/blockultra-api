import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'tags' })
export class Tag extends BaseSchema {
  @Column({ unique: true })
  id: number = 0;

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  slug: string = '';

  @Column({ nullable: true })
  isIcoList: boolean = false;

  @Column({ nullable: true })
  ruName: string = '';

  @Column({ nullable: true, type: 'json' })
  avgPriceChange: string = '';

  @Column({ nullable: true })
  gainers: number = 0;

  @Column({ nullable: true })
  losers: number = 0;

  @Column({ nullable: true, type: 'json' })
  rankedCoins: string = '';

  @Column({ nullable: true, type: 'numeric' })
  dominance: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  marketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  volume24h: number = 0;
}
