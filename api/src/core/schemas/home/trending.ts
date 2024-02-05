import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'trendings' })
export class Trending extends BaseSchema {
  @Column({ nullable: true, unique: true })
  key: string = '';

  @Column({ nullable: true })
  rank: number = 0;

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  symbol: string = '';

  @Column({ type: 'json', nullable: true })
  image: string = '';

}
