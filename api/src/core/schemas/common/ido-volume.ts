import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'ido_volumns' })
export class IdoVolume extends BaseSchema {
  @Column()
  ido_platform_id: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  time: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  marketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  volume24h: number = 0;

  @Column()
  from_date: string = '';

  @Column()
  to_date: string = '';
  
}
