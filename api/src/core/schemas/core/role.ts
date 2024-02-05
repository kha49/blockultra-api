import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Perm } from './perm'; 
import { User } from './user';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = '';

  @Column()
  profile_type: number = 0;

  @Column({ nullable: true })
  description: string = '';

  @ManyToMany(() => User, (users: any) => users.roles)
  @JoinTable({
    name: 'roles_users',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[] | undefined;

  @ManyToMany(() => Perm, (perm) => perm.roles, {
    eager: true,
  })
  @JoinTable({
    name: 'roles_perms',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'perm_id' },
  })
  permissions: Perm[] | undefined;
}
