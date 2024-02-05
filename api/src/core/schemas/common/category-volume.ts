import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'category_volumns' })
export class CategoryVolumn extends BaseSchema {
  @Column()
  category_id: number = 0;

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
