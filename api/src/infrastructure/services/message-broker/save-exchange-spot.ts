import { EntityManager } from 'typeorm';
import { ExchangeSpot } from '../../../core/schemas/exchange/exchange-spot'; 
import { CommonUtil } from '../../../core/utils/common.util';
import { DateUtil } from '../../../core/utils/date.util';

export class SaveExchangeSpot { 

  private readonly repo;

  constructor(private readonly em: EntityManager) {
    this.repo = this.em.getRepository(ExchangeSpot);
  }

  async execute(datas: any): Promise<any> {
    const insertDelay = 2000;
    try {
      const batchSize = 1000;
      const batches = CommonUtil.splitIntoBatches(datas, batchSize);
      for (const batch of batches) {
        await this.repo.insert(datas);
        await CommonUtil.delay(insertDelay);
      }
      const dateYesterday = DateUtil.getYesterdayDate();
      const result = await this.repo
        .createQueryBuilder()
        .delete()
        .from(ExchangeSpot)
        .where('DATE(created_at) < :date', { date: dateYesterday })
        .execute();

      console.log(`All exchange with length ${datas.length} inserted and deleted data older than yesterday${result}`);
    } catch (error) {
      console.log(error);
    }
  }
}
