import { Global } from '../../../core/schemas/common/global';
import { EntityManager } from 'typeorm';

export class SaveFearGreed {
  private readonly globalRepo;

  constructor(private readonly em: EntityManager) {
    this.globalRepo = this.em.getRepository(Global);
  }

  async execute(data: any): Promise<any> {
    const currentData = await this.globalRepo.find();
    let newData = currentData.length > 0 ? currentData[currentData.length - 1] : null;
    if (newData) {
      newData.fear_greed = data;
      this.globalRepo.save(newData);
      console.log(`fear_greed inserted`);
    } else {
      console.log(`fear_greed inserted error. global is null`);
    }
  }
}
