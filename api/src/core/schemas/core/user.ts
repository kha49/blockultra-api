import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role'; 
import { BcryptUtil } from '../../../core/utils/bcrypt.util';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  @Index({ unique: true })
  username: string = '';

  @Column()
  role_ids: string = '';

  @Column()
  password: string = '';

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await BcryptUtil.hash(password || this.password);
  }

  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable({
    name: 'roles_users',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles?: Role[];

  @Column({ nullable: true })
  firstName: string = '';
  
  @Column({ nullable: true })
  lastName: string = '';

  @Column({ nullable: true })
  email: string = '';

  @Column({ nullable: true })
  mobile: string = '';

  @Column({ nullable: true })
  intro: string = '';

  @Column({ type: 'json', nullable: true, default: null })
  profile: string = '';

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ nullable: true })
  hash_refresh_token: string = '';
}
