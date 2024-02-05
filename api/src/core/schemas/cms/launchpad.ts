import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'launchpads' })
export class Launchpad extends BaseSchema {
  @Column({ nullable: true })
  logo: string = '';

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  created_by: string = '';

  @Column({ nullable: true })
  type: string = '';

  @Column({ nullable: true })
  tier: number = 0;

  @Column({ nullable: true })
  token: string = '';

  @Column({ nullable: true, type: 'numeric' })
  min_amount: number = 0;

  @Column({ nullable: true, type: 'json' })
  supported_blockchain: string = '';

  @Column({ nullable: true })
  foundation: Date = new Date();

  @Column({ nullable: true, type: 'json' })
  socials: string = '';

  @Column({ nullable: true, type: 'json' })
  lottery: string = '';

  @Column({ nullable: true, type: 'json' })
  guaranteed: string = '';

  @Column({ nullable: true, type: 'text' })
  about: string = '';
}
