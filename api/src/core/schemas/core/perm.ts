import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role';

@Entity({ name: 'permissions' })
export class Perm {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  profile_types: string = '[]';

  @Column()
  title: string = '';

  @Column()
  module: string = '';

  @Column()
  action: string = '';

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'roles_perms',
    joinColumn: { name: 'perm_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[] | undefined;
}
