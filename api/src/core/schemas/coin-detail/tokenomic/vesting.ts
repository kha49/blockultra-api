import { Column, Entity, OneToMany } from 'typeorm';
import { Allocation } from './allocation';
import { BaseSchema } from '../../core/base';

@Entity({ name: 'vestings' })
export class Vesting extends BaseSchema {
  @Column({ unique: true })
  coin_id: number = 0;

  @Column()
  coin_key: string = '';

  @Column({ nullable: true })
  total_start_date: string = '';

  @Column({ nullable: true })
  tge_start_date: string = '';

  @Column({ nullable: true, type: 'json' })
  links: string = '';

  @Column({ nullable: true })
  is_hidden: boolean = false;

  @Column({ nullable: true })
  createdAt: string = '';

  @Column({ nullable: true })
  updatedAt: string = '';

  @OneToMany(() => Allocation, (a) => a.vesting)
  allocations?: Allocation[];
}
