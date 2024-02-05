import { BcryptUtil } from '../../../core/utils/bcrypt.util';
import { User } from '../../../core/schemas/core/user';
import { DeepPartial, EntityManager } from 'typeorm';

export class ChangePasswordFlow {
  private readonly entityManager: EntityManager; 
  constructor(_entityManager: EntityManager) {
    this.entityManager = _entityManager; 
  }

  async execute(pwd: any, access_token: string) {
    const userRepo = this.entityManager.getRepository(User);
    const username = BcryptUtil.getUserNameByToken(access_token);
    const user = await userRepo.findOne({where: {username}});
    if(user){
      const isMatched = await BcryptUtil.compare(pwd.passwordOld, user.password);
      if (isMatched) {
        user.password = await BcryptUtil.hash(pwd.passwordNew);
      }
    } 
    return await userRepo.save(user as DeepPartial<User>);
  }
}

export default ChangePasswordFlow;
