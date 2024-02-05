import BusinessCategory from '../../../core/business/block-ultra/logic/category.logic';
import { ICategoryService } from '../../../core/interfaces/category';
import { IFundraisingService } from '../../../core/interfaces/fundraising'; 

export class GetCategoryListBackerFlow {
  constructor(
    private readonly service: ICategoryService,
    private readonly serviceFundraising: IFundraisingService,
  ) {}

  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    const queryFundraising = await this.serviceFundraising.getQueryBuilder();
    const datasFundraising = await queryFundraising.where("EXISTS (SELECT 1 FROM json_array_elements(investors::json) AS item WHERE item->>'slug' = :key)",{ key: key }).getMany();
    const datas = await query.getMany(); 
    const result = BusinessCategory.getCatesBacker(datas, datasFundraising); 
    const sortData = result.sort((a: any, b: any) => b.count - a.count);
    const top9Elements = sortData.slice(0, 9);
    return top9Elements;
  }
}

export default GetCategoryListBackerFlow;
