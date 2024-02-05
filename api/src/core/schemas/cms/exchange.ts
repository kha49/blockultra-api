import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'exchanges' })
export class Exchange extends BaseSchema {
  @Column({ nullable: true })
  logo: string = '';
  @Column({ nullable: true })
  name: string = '';
  @Column({ nullable: true })
  created_by: string = '';
  @Column({ nullable: true })
  tier: number = 0;
  @Column({ nullable: true })
  native_token: string = '';
  @Column({ nullable: true })
  financial_reserves: string = '';
  @Column({ nullable: true })
  location: string = '';
  @Column({ nullable: true })
  type: string = '';
  @Column({ nullable: true })
  fees: string = '';
  @Column({ nullable: true })
  foundation: Date = new Date();
  @Column({ nullable: true, type: 'json' })
  resource: string = '';
  @Column({ nullable: true, type: 'text' })
  about: string = '';
}
