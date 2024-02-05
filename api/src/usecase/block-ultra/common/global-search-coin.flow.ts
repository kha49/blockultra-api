import { ICategoryService } from '../../../core/interfaces/category';
import { ICoinService } from '../../../core/interfaces/coin';
import { IFundraisingService } from '../../../core/interfaces/fundraising';
import { IIeoIdoProjectService } from '../../../core/interfaces/ieo-ido-project';
import { ITrendingService } from '../../../core/interfaces/trending';

import BusinessSearch from '../../../core/business/block-ultra/rule/search.rule';
import { CtrlUtil } from '../../../core/utils/ctrl.util';

export class GlobalSearchCoinFlow {
  constructor(
    private readonly coinService: ICoinService,
    private readonly fundraisingService: IFundraisingService,
    private readonly trendingService: ITrendingService,
    private readonly ieoIdoProjectService: IIeoIdoProjectService,
    private readonly categoryService: ICategoryService,
  ) {}

  async execute(name: string) {
    if (name) {
      const categoryQuery = await this.categoryService.getQueryBuilder();
      categoryQuery.where('name LIKE :name', { name: `%${name}%` });
      const categories = await categoryQuery.select(BusinessSearch.SELECT_CATEGORY_PROPS).getRawMany();

      const coinQuery = await this.coinService.getQueryBuilder();
      coinQuery.where('name LIKE :name', { name: `%${name}%` });
      CtrlUtil.applySortQuery('rank', 'asc', coinQuery);
      const coins = await coinQuery.getMany();
      const coinResult = coins.map((c: any) => {
        return {
          key: c.key,
          rank: c.rank,
          name: c.name,
          symbol: c.symbol,
          image: c.image,
          price: parseFloat(c.price),
          priceChangeIn24h: c.price && c.histPrices ? (parseFloat(c.price) / c.histPrices['24H'].USD - 1) * 100: null,
        };
      });

      const fundraisingQuery = await this.fundraisingService.getQueryBuilder();
      fundraisingQuery.where('name LIKE :name', { name: `%${name}%` });
      const fundraisings = await fundraisingQuery.select(BusinessSearch.SELECT_FUNDRAISING_PROPS).getRawMany();

      const trendingQuery = await this.trendingService.getQueryBuilder();
      trendingQuery.where('name LIKE :name', { name: `%${name}%` });
      const trendings = await trendingQuery.take(BusinessSearch.DEFAULT_NUMBER_GLOBAL_SEARCH_RESULT).select(BusinessSearch.SELECT_TRENDING_PROPS).getRawMany();

      const ieoIdoUpcomingQuery = await this.ieoIdoProjectService.getQueryBuilder();
      ieoIdoUpcomingQuery.where('name LIKE :name', { name: `%${name}%` });
      const upcomings = await ieoIdoUpcomingQuery.select(BusinessSearch.SELECT_IEO_IDO_PROPS).getRawMany();
      const result = {
        categories,
        coins: coinResult,
        fundraisings,
        upcomings,
        trendings,
      };
      return result;
    } else {
      const trendingQuery = await this.trendingService.getQueryBuilder();
      const trendings = await trendingQuery.take(BusinessSearch.DEFAULT_NUMBER_GLOBAL_SEARCH_RESULT).select(BusinessSearch.SELECT_TRENDING_PROPS).getRawMany();
      const result = {
        trendings,
      };
      return result;
    }
  }
}

export default GlobalSearchCoinFlow;
