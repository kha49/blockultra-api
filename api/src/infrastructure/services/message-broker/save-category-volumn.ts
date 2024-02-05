import { EntityManager } from 'typeorm';
import { CategoryVolumn } from '../../../core/schemas/common/category-volume';
import { CommonUtil } from '../../../core/utils/common.util';

export class SaveCategoryVolumn {
  private readonly categoryVolumnRepo;

  constructor(private readonly em: EntityManager) {
    this.categoryVolumnRepo = this.em.getRepository(CategoryVolumn);
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
      console.log(`All category volumn with length ${datas.length} inserted`);
    } catch (error) {
      console.log(error);
    }
  } 
}
