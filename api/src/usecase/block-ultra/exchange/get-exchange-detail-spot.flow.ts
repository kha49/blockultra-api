import { AxiosService } from '../../../infrastructure/services/axios.service';
import { IExchangeDetailSpotService } from '../../../core/interfaces/exchange-detail-spot';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import BusinessExchange from '../../../core/business/block-ultra/logic/exchange.logic';
import { UrlUtil } from '../../../core/utils/url.util';

export class GetExchangeDetailSpotFlow {
  constructor(private readonly service: IExchangeDetailSpotService) {}
  async execute(
    key?: string,
    search_key?: string,
    sort_by?: string,
    sort_order?: 'asc' | 'desc',
    limit?: number,
    page?: number,
    type?: string,
  ) {
    const query = await this.service.getQueryBuilder("eds");
    query.where({ exchangeKey: key });
    const total = await query.getCount();
    if (total > 0) {
      query.where("'1'='1'");
      if (type && type.toUpperCase() != 'ALL') {
        query.andWhere('exchangeGroup=:type', {
          type: type.toUpperCase() == 'CEX' ? 'main' : 'dex',
        });
      }
      query.select([
        'hc.image AS image',
        'eds.coinName AS coinName',
        'eds.coinKey AS coinKey',
        'eds.symbol AS symbol',
        'eds.usdLast AS usdLast',
        'eds.changePercent AS changePercent',
        'eds.usdVolume AS usdVolume',
        'eds.exchangePercentVolume AS exchangePercentVolume',
      ])
      .innerJoin("coins", "hc", 'eds.coinKey = hc.key');

      CtrlUtil.applySearchQuery(search_key || '', '', query);
      CtrlUtil.applySortQuery(sort_by || '', sort_order || 'asc', query); 
      CtrlUtil.applyPaginationQuery(limit || 10, page || 1, query);
 
      const datas = await query.getRawMany();
      const result = BusinessExchange.getExchangeDetailSpotList(datas); 
      const res = CtrlUtil.getPagingFormat(
        result,
        page || 1,
        limit || 10,
        total,
      );
      return res;
    } else {
      const param = `customFilter=base_coin_is_not_derivative&exchangeKeys=${key}`;
      const url = UrlUtil.getTickers(param);
      const response = await AxiosService.get(url);
      let datas = response.data.data;
      const batchSize = 1000;
      await this.service.batchInsert(datas, batchSize);
      let dataResult = CtrlUtil.applySearch(search_key || '', datas);
      dataResult = CtrlUtil.applySort(
        sort_by || '',
        sort_order || 'asc',
        dataResult,
      );
      dataResult = CtrlUtil.applyPagination(limit, page, dataResult);
      const result = BusinessExchange.getExchangeDetailSpotList(dataResult); 
      const res = CtrlUtil.getPagingFormat(
        result,
        page || 1,
        limit || 10,
        datas.length,
      );
      return res;
    }
  }
}
export default GetExchangeDetailSpotFlow;
