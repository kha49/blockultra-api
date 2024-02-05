import { User } from '../../../core/schemas/core/user';
import { EntityManager } from 'typeorm';

export class CrudUserFlow {
  private readonly entityManager: EntityManager;
  constructor(_entityManager: EntityManager) {
    this.entityManager = _entityManager;
  }

  async getQuery() {
    const userRepo = this.entityManager.getRepository(User);
    return userRepo.createQueryBuilder();
  }

  async create(user: any) {
    const userRepo = this.entityManager.getRepository(User);
    const result = await userRepo.create(user);
    return { status: 'success', result };
  }

  async update(user: any) {
    const userRepo = this.entityManager.getRepository(User);
    const result = await userRepo.update(user._id, user);
    return { status: 'success', result };
  }

  async list() {
    const userRepo = this.entityManager.getRepository(User);
    const result = await userRepo.find();
    return { status: 'success', result };
  }

  async deletes(ids: number[]) {
    const userRepo = this.entityManager.getRepository(User);
    await userRepo.delete(ids);
    return { status: 'success', result: ids };
  }
}

export default CrudUserFlow;
