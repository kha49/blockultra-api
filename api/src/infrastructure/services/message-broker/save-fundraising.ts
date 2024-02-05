import { Fundraising } from '../../../core/schemas/home/fundraising';
import { EntityManager } from 'typeorm';

export class SaveFundraising {
  private fundraisingRepo;

  constructor(private readonly em: EntityManager) {
    this.fundraisingRepo = this.em.getRepository(Fundraising);
  }

  async execute(datas: any): Promise<any> {
    try {
      await this.fundraisingRepo.insert(datas); 
      console.log(`Fundraising with length ${datas.length} inserted`);
    } catch (error) {
      console.log(error);
    }
  }
}
