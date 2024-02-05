import BusinessCategoryVolume from "../../../core/business/block-ultra/logic/category-volumn.logic";
import { ICategoryVolumnService } from "../../../core/interfaces/category-volumn";

 

export class GetCategoryVolumeFlow {
  constructor(private readonly service: ICategoryVolumnService) {}

  async execute(category_id: number, time: string) { 
    const query = await this.service.getQueryBuilder();
    query.where({ category_id });
    const categoryVolumns = await query.getMany();
    const result = BusinessCategoryVolume.calculatorVolume(categoryVolumns, time)
    return result;
  }
}

export default GetCategoryVolumeFlow;
