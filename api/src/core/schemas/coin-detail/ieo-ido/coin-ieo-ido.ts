import { Column, Entity } from 'typeorm';
import { BaseSchema } from '../../core/base';

@Entity({ name: 'coin_ieo_idos' })
export class CoinIeoIdo extends BaseSchema {
  @Column()
  id?: number;
  
  @Column({ nullable: true })
  end: string = '';

  @Column()
  coin_key: string = '';

  @Column({ nullable: true })
  type: string = '';

  @Column({ nullable: true, type: 'json' })
  athRoi: string = '';

  @Column({ nullable: true })
  start: string = '';

  @Column({ nullable: true })
  status: string = '';

  @Column({ nullable: true, type: 'numeric' })
  tokensForSale: number = 0;
 
  @Column({ nullable: true })
  showOnlyMonth: boolean = false;

  @Column({ nullable: true, type: 'json' })
  roi: string = '';

  @Column({ nullable: true, type: 'json'  })
  price: string = '';
 
  @Column({ nullable: true, type: 'json'  })
  raise: string = '';
 
  @Column({ nullable: true })
  lockupPeriod: string = '';

  @Column({ nullable: true })
  idoPlatformKey: string = '';

}
