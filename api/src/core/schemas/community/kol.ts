import { BaseSchema } from '../../../core/schemas/core/base';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'kols' })
export class Kols extends BaseSchema {
  @Column({ nullable: true })
  id: number = 0;

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ nullable: true })
  from: string = '';
 
}
