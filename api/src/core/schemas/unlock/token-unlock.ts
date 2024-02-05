import { Column, Entity } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'token_unlocks' })
export class TokenUnlock extends BaseSchema {
  @Column({ nullable: true, unique: true })
  key: string = '';
  @Column({ nullable: true })
  symbol: string = '';
  @Column({ nullable: true })
  image: string = '';
  @Column({ nullable: true })
  name: string = '';
  @Column({ nullable: true, type: 'numeric' })
  price: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  chg24h: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  marketCap: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  circulatingSupply: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  lockedTokensPercent: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  unlockedTokensPercent: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  lockedTokens: number = 0;
  @Column({ nullable: true, type: 'numeric' })
  unlockedTokens: number = 0;
  @Column({ type: 'timestamp', nullable: true })
  date: Date = new Date();
  @Column({ nullable: true, type: 'numeric' })
  nextUnlockPercent: number = 0;
  @Column({ nullable: true, type: 'json' })
  nextUnlocks: string = '';
  @Column({ nullable: true, type: 'json' })
  funds: string = '';
}
