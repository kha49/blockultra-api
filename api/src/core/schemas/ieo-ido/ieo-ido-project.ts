import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'ieo_ido_project' })
export class IeoIdoProject extends BaseSchema {

  @Column({ unique: true })
  key: string = '';
 
  @Column({ nullable: true, type: 'numeric' })
  athRoi: string = '';

  @Column({ type: 'json', nullable: true })
  blockchains: string = '';

  @Column({ type: 'timestamp', nullable: true })
  till: Date = new Date();

  @Column({ type: 'json', nullable: true })
  category: string = '';
 
  @Column({ nullable: true })
  category_name: string = '';
  
  @Column({ type: 'json', nullable: true })
  funds: string = '';

  @Column({ nullable: true })
  image: string = '';

  @Column({ nullable: true, type: 'numeric' })
  initialCap: number = 0;

  @Column({ type: 'json', nullable: true })
  launchpads: string = '';

  @Column({ type: 'timestamp', nullable: true })
  listingDate: Date = new Date();

  @Column({ nullable: true, type: 'numeric' })
  marketCap: string = '';

  @Column({ nullable: true })
  name: string = ''; 

  @Column({ nullable: true, type: 'numeric' })
  price: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  raise: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  roi: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  salePrice: number = 0;

  @Column({ nullable: true })
  symbol: string = ''; 

  @Column({ type: 'json', nullable: true })
  tags: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalRaise: number = 0;

  @Column({ type: 'json', nullable: true })
  type: string = '';

  @Column({ nullable: true, type: 'numeric' })
  volume24h: number = 0;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date = new Date();

  @Column({ nullable: true })
  isSponsored: boolean = false;

  @Column({ nullable: true })
  status: string = ''
}
