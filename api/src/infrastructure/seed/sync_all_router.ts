import { createConnection } from 'typeorm';
  
import { getRoleRouter } from '../../application/routers/admin-cms/role.router';
import { getAuthRouter } from '../../application/routers/admin-cms/auth.router';
import { getUserRouter } from '../../application/routers/admin-cms/user.router';
import { getPermRouter } from '../../application/routers/admin-cms/perm.router';
import typeOrmConfig from '../config/typeorm.config';
import { Perm } from '../../core/schemas/core/perm';

async function seed() {
  try {
    const connection = await createConnection(typeOrmConfig);
    const permRepo = connection.getRepository(Perm);
    const permissions: any = [];
    const permList = await permRepo.find();
    const userRouters = getUserRouter(connection.manager);
    const authRouters = getAuthRouter(connection.manager);
    const roleRouters = getRoleRouter(connection.manager);
    const permRouters = getPermRouter(connection.manager);

    const routers = [
      ...authRouters,
      ...userRouters,
      ...roleRouters,
      ...permRouters,
    ];

    routers.forEach((route: any) => {
      const module = findModule(route);
      const action = findAction(route);

      const perm = {
        title: module + ' ' + action,
        module: module,
        action: action,
        profile_types: route.name,
      };
      console.log(perm);
      
      const permCreated = permRepo.create(perm);
      permissions.push(permCreated);
    });
    await permRepo.save(permissions);

    console.log('sync all permissions');
    await connection.close();
  } catch (error) {
    console.log('Error connecting to the database:', error);
  }
}

function findModule(route: any) {
  const module = route.path.replace('/', '').split('/')[0];
  return module;
}

function findAction(route: any) {
  const module = route.path.replace('/', '').split('/');
  const action = module.length > 1 ? module[1] : route.method;
  return action;
}
seed();
