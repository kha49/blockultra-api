import { CommonUtil } from '../../../core/utils/common.util';
import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { ICoinSpotService } from '../../../core/interfaces/coin-spot';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { UrlUtil } from '../../../core/utils/url.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetCoinSpotFlow {
  constructor(private readonly service: ICoinSpotService) {}
  async execute(
    coin_key: string,
    search_key: string = '',
    sort_by: string = 'usdVolume',
    sort_order: 'asc' | 'desc',
    limit: number = 10,
    page: number = 1,
    type: string = '',
  ) {
    const query = await this.service.getQueryBuilder();
    query.where({ coinKey: coin_key });
    const totalRecord = await query.getCount();
    if (totalRecord > 0) {
      if (type.toUpperCase() != 'ALL' && type) {
        query.andWhere('"exchangeGroup"=:type', {
          type: type.toUpperCase() == 'CEX' ? 'main' : 'dex',
        });
      }
      CtrlUtil.applySearchQuery(search_key, 'exchangeKey', query);
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
      CtrlUtil.applyPaginationQuery(limit, page, query);
      const total = await query.getCount();
      const datas = await query.getMany();
      const result = BusinessCoin.getMarketSpot(datas);
      const res = CtrlUtil.getPagingFormat(result, page, limit, total);
      return res;
    } else {
      const param = `includeQuote=true&exchangeTypes=cex,dex&coinKeys=${coin_key}`;
      const apiUrl = UrlUtil.getTickers(param);
      const response = await AxiosService.get(apiUrl);
      let datas = response.data.data;
      const batchSize = 1000;
      for (let index = 0; index < datas.length; index++) {
        datas[index].exchangeIcon = await CommonUtil.convertToBase64(datas[index].exchangeIcon);
      }
      this.service.batchInsert(datas, batchSize);

      let dataResult  = CtrlUtil.applySearch(search_key, datas);
      dataResult      = CtrlUtil.applySort(sort_by, sort_order, dataResult);
      dataResult      = CtrlUtil.applyPagination(limit, page, dataResult);
      const result    = BusinessCoin.getMarketSpot(datas);
      console.log(datas);
      const res       = CtrlUtil.getPagingFormat(
        result,
        page,
        limit,
        datas.length,
      );
      return res;
    }
  }
}

export default GetCoinSpotFlow;
