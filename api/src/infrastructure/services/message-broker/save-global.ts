import { Global } from '../../../core/schemas/common/global';
import { EntityManager } from 'typeorm';

export class SaveGlobal {
  private readonly globalRepo;

  constructor(private readonly em: EntityManager) {
    this.globalRepo = this.em.getRepository(Global);
  }

  async execute(data: any): Promise<any> {
    this.globalRepo.save(data);
    console.log(`Global inserted`);
  }
}
