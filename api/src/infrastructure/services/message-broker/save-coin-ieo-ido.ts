import { CommonUtil } from '../../../core/utils/common.util';
import { CoinIeoIdo } from '../../../core/schemas/coin-detail/ieo-ido/coin-ieo-ido';
import { EntityManager } from 'typeorm';

export class SaveCoinIeoIdo {
  private readonly coinUpcomingRepo;

  constructor(private readonly em: EntityManager) {
    this.coinUpcomingRepo = this.em.getRepository(CoinIeoIdo);
  }

  async execute(datas: any): Promise<any> {
    const insertDelay = 2000;
    try {
      const batchSize = 1000;
      const batches = CommonUtil.splitIntoBatches(datas, batchSize);
      for (const batch of batches) {
        await this.coinUpcomingRepo.insert(datas);
        await CommonUtil.delay(insertDelay);
      }

      console.log(`All coin ieo ido with length ${datas.length} inserted`);
    } catch (error) {
      console.log(error);
    }
  }
}
