import { EntityManager } from 'typeorm';
import { CommonUtil } from '../../../core/utils/common.util';
import { IdoVolume } from '../../../core/schemas/common/ido-volume';

export class SaveIdoVolumn {
  private readonly categoryVolumnRepo;

  constructor(private readonly em: EntityManager) {
    this.categoryVolumnRepo = this.em.getRepository(IdoVolume);
  }

  async execute(datas: any): Promise<any> {
    const insertDelay = 2000;
    try {
      const batchSize = 1000;
      const batches = CommonUtil.splitIntoBatches(datas, batchSize);
      for (const batch of batches) {
        await this.categoryVolumnRepo.insert(batch);
        await CommonUtil.delay(insertDelay);
      }
      console.log(`All ido volumn with length ${datas.length} inserted`);
    } catch (error) {
      console.log(error);
    }
  } 
}
