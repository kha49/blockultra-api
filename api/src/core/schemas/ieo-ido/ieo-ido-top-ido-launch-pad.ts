import { Entity, Column } from 'typeorm';
import { BaseSchema } from '../core/base';

@Entity({ name: 'ido_ieo_top_ido_launch_pad' })
export class IeoIdoTopIdoLaunchPad extends BaseSchema {
  @Column({ nullable: true, unique: true })
  key: string = '';

  @Column({ nullable: true })
  id: number = 0;

  @Column({ nullable: true })
  name: string = '';

  @Column({ nullable: true })
  isSponsored: string = '';

  @Column({ nullable: true, type: 'json' })
  tokenPlatforms: string = '';

  @Column({ nullable: true })
  image: string = '';

  @Column({ nullable: true })
  icon: string = '';

  @Column({ nullable: true, type: 'numeric' })
  enterPrice: number = 0;

  @Column({ nullable: true, type: 'json' })
  nativeToken: string = '';

  @Column({ nullable: true })
  projectsCount: number = 0;

  @Column({ nullable: true })
  description: string = '';

  @Column({ nullable: true })
  foundationDate: string = '';

  @Column({ nullable: true, type: 'numeric' })
  totalFundsRaised: number = 0;

  @Column({ nullable: true })
  type: string = '';

  @Column({ nullable: true, type: 'numeric' })
  avgAllocationsSize: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  avgNumOfParticipants: number = 0;

  @Column({ nullable: true, type: 'json' })
  avgRoi: string = '';

  @Column({ nullable: true, type: 'json' })
  links: string = '';

  @Column({ nullable: true, type: 'numeric' })
  marketCap: number = 0;

  @Column({ nullable: true, type: 'numeric' })
  volume24: number = 0;

  @Column({ nullable: true, type: 'json' })
  categoriesDistribution: string = '';

  @Column({ nullable: true, type: 'numeric' })
  minTokenToParticipate: number = 0;

  @Column({ nullable: true })
  gainers: number = 0;

  @Column({ nullable: true })
  losers:  number = 0;

  @Column({ nullable: true, type: 'numeric' })
  avg_roi_current:  number = 0;

  @Column({ nullable: true, type: 'numeric' })
  avg_roi_ath:  number = 0;
}
