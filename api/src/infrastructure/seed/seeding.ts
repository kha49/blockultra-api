import { createConnection, EntityManager } from 'typeorm'; 

  
import { ConstVariableUtil } from '../../core/utils/const.variable';
import typeOrmConfig from '../config/typeorm.config';
import { Perm } from '../../core/schemas/core/perm';
import { Role } from '../../core/schemas/core/role';
import { User } from '../../core/schemas/core/user';
import { UserRole } from '../../core/schemas/core/users-roles';

const publicApi = '[]';
const admin = '[1]';
const staff = '[2]';

async function seed() {
  const connection = await createConnection(typeOrmConfig);
  try {
    await connection.transaction(async (em: EntityManager) => {
      await createRole(em);
      await createRolePerm(em);
      await createUser(em);
      await createUserRole(em);
    });
    console.log('All operations completed successfully.');
  } catch (error) {
    console.error('Error occurred during the transaction:', error);
  } finally {
    await connection.close();
  }
}

async function createRolePerm(em: EntityManager) {
  const permRepo = em.getRepository(Perm);
  const perms = await permRepo.find();
  const rolesPerms: any = [];
  perms.forEach((perm: any) => {
    if (perm.profile_types == admin) {
      const rolePerm = {
        role_id: 1,
        perm_id: perm.id,
      };
      rolesPerms.push(rolePerm);
    } else if (perm.profile_types == staff) {
      const rolePerm = {
        role_id: 2,
        perm_id: perm.id,
      };
      rolesPerms.push(rolePerm);
    } else if (
      perm.profile_types == '[1,2]' ||
      perm.profile_types == '[1,2]' ||
      perm.profile_types == publicApi
    ) {
      const rolePerm = {
        role_id: 1,
        perm_id: perm.id,
      };
      rolesPerms.push(rolePerm);
      const rolePerm2 = {
        role_id: 2,
        perm_id: perm.id,
      };
      rolesPerms.push(rolePerm2);
    }
  });
  const values = rolesPerms.map((rolePerm: any) => ({
    role_id: rolePerm.role_id,
    perm_id: rolePerm.perm_id,
  }));
  await em
    .createQueryBuilder()
    .insert()
    .into('roles_perms')
    .values(values)
    .execute();
}
async function createRole(em: EntityManager) {
  const roles = [
    {
      id: 1,
      title: 'Admin',
      profile_type: 1,
      description: '',
    },
    {
      id: 2,
      title: 'Staff',
      profile_type: 2,
      description: '',
    },
  ];
  const roleRepo = em.getRepository(Role);
  const roleList: any = [];
  roles.forEach((g) => {
    const roleCreated = roleRepo.create(g);
    roleList.push(roleCreated);
  });
  await roleRepo.save(roleList);
}

async function createUser(em: EntityManager) {
  const passDefault = ConstVariableUtil.PASSWORD_DEFAULT;
  const user_admin = {
    id: 1,
    username: 'admin',
    full_name: 'Admin',
    role_ids: admin,
    password: passDefault,
  };

  const user_staff = {
    id: 2,
    username: 'staff',
    full_name: 'Staff',
    role_ids: staff,
    password: passDefault,
  };

  const userRepo = em.getRepository(User);

  const adminUserCreated = await userRepo.create(user_admin);
  await userRepo.save(adminUserCreated);

  const staffUserCreated = await userRepo.create(user_staff);
  await userRepo.save(staffUserCreated);
}

async function createUserRole(em: EntityManager) {
  const ug1 = {
    role_id: 1,
    user_id: 1,
  };

  const ug2 = {
    role_id: 2,
    user_id: 2,
  };
  const userroleRepo = em.getRepository(UserRole);
  await userroleRepo.save(ug1);
  await userroleRepo.save(ug2);
}

seed();
