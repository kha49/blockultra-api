import { Entity, Column } from 'typeorm'; 
import { BaseSchema } from '../core/base';

@Entity({ name: 'wallets' })
export class Wallet extends BaseSchema {
  @Column({ nullable: true })
  logo: string = '';

  @Column({ nullable: true })
  name: string = '';
 
  @Column({ nullable: true })
  link?: string; 
 
}
