import { Between } from 'typeorm';
import { ICoinHistoricalService } from '../../../core/interfaces/coin-historical';
import { CtrlUtil } from '../../../core/utils/ctrl.util';
import { DateUtil } from '../../../core/utils/date.util';
import { UrlUtil } from '../../../core/utils/url.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetHistoricalFlow {
  constructor(private readonly service: ICoinHistoricalService) {}
  async execute(options: {
    coin_key: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const {
      coin_key,
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
      dateFrom = '',
      dateTo = '',
    } = options;
    const query = await this.service.getQueryBuilder();
    query.where({ coinKey: coin_key });
    const totalRecords = await query.getCount();

    if (totalRecords > 0) {
        CtrlUtil.applySortQuery(sort_by, sort_order, query);
        CtrlUtil.applyPaginationQuery(limit, page, query);
        if (dateFrom && dateTo) {
          query.andWhere({ date: Between(dateFrom, dateTo) });
        }
        const total = await query.getCount();
        const datas = await query.getMany();
        const result = CtrlUtil.getPagingFormat(datas, page, limit, total);
        return result;
    } else {
        const dateTo     = DateUtil.getCurrentDate(1, 0);
        const dateFrom   = DateUtil.getCurrentDate(11, 0);
        const apiUrl     = UrlUtil.getHistorical(coin_key, dateFrom, dateTo);
        const response   = await AxiosService.get(apiUrl);
        const datas      = response.data.data;
        const batchSize  = 1000;
        const dataInsert = datas.map((item: any) => {
          return { ...item, coinKey: coin_key, date: new Date(item.date) };
        });
        await this.service.batchInsert(dataInsert, batchSize);
        let dataResult     = CtrlUtil.applySort(sort_by, sort_order, dataInsert);
        dataResult         = CtrlUtil.applyPagination(limit, page, dataResult);
        const result       = CtrlUtil.getPagingFormat(
          dataResult,
          page,
          limit,
          datas.length,
        );
        return result;
    }
  }
}

export default GetHistoricalFlow;
