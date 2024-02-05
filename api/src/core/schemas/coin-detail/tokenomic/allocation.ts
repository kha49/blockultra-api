import { Entity, Column, ManyToOne } from 'typeorm';
import { Vesting } from './vesting';
import { BaseSchema } from '../../core/base';

@Entity({ name: 'allocations' })
export class Allocation extends BaseSchema {
  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true, type: 'numeric' })
  tokens_percent: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  tokens: number = 0;

  @Column({ nullable: true })
  unlock_type: string = '';

  @Column({ nullable: true })
  unlock_frequency_type: string = '';

  @Column({ nullable: true, type: 'numeric' })
  unlock_frequency_value: number = 0;

  @Column({ nullable: true })
  vesting_duration_type: string = '';

  @Column({ nullable: true, type: 'numeric' })
  vesting_duration_value: number = 0;

  @Column({ nullable: true })
  round_date: string = '';

  @Column({ nullable: true, type: 'json' })
  batches: string = '';

  @ManyToOne(() => Vesting, (v) => v.allocations)
  vesting?: Vesting;
}
