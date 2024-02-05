import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../../core/base';

@Entity({ name: 'coin_fundraising' })
export class CoinFundraising extends BaseSchema {
  @Column()
  coin_key: string = '';
  @Column({ nullable: true })
  date: string = '';
  @Column({ nullable: true, type: 'numeric' })
  raise?: number;
  @Column({ nullable: true })
  type?: string;
  @Column({ nullable: true })
  valuation?: string;
  @Column({ nullable: true })
  linkToAnnouncement: string = '';
  @Column({ nullable: true, type: 'json' })
  investors: string = '';
}
