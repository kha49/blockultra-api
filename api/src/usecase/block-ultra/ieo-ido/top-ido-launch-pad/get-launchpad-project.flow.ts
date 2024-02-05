import { CtrlUtil } from '../../../../core/utils/ctrl.util';
import BusinessIeoIdo from '../../../../core/business/block-ultra/logic/ieo-ido.logic';
import { IIeoIdoProjectService } from '../../../../core/interfaces/ieo-ido-project';
import { ICoinService } from '../../../../core/interfaces/coin';

export class GetLaunchPadProjectFlow {
  constructor(
    private readonly service: IIeoIdoProjectService,
    private readonly coinService: ICoinService,
  ) {}

  async execute(options: {
    key: string;
    status?: 'past' | 'upcoming';
    search_key?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    limit?: number;
    page?: number;
    is_hot: string;
  }) {
    const {
      key,
      search_key = '',
      sort_by = '',
      sort_order = 'asc',
      limit = 10,
      page = 1,
      status = 'past',
      is_hot = 'all',
    } = options;
    const query = await this.service.getQueryBuilder();
    query.where(
      "EXISTS (SELECT 1 FROM json_array_elements(launchpads::json) AS item WHERE item->>'key' = :key)",
      { key },
    );
    query.andWhere({ status });
    const total = await query.getCount();
    CtrlUtil.applySearchQuery(search_key, 'key', query);
    if (sort_by == 'launchpads') {
      query.orderBy('json_array_length(launchpads)', sort_order.toUpperCase());
    } else {
      CtrlUtil.applySortQuery(sort_by, sort_order, query);
    }
    const datas = await query.getMany();
    const keys = datas.map((x: any) => x.key);
    const coinQuery = await this.coinService.getQueryBuilder();
    coinQuery.where({ key: { $in: keys } });
    coinQuery.select(['price']);
    const coins = await coinQuery.getRawMany();
    let dataResult;
    if (status == 'past') {
      dataResult = BusinessIeoIdo.getLaunchPadDetailProjectEnded(datas, coins);
    } else {
      dataResult = BusinessIeoIdo.getLaunchPadDetailProjectUpcoming(datas);
    }
    if (is_hot != 'all') {
      dataResult = dataResult.filter((item: any) => item.isHot);
    }
    dataResult = CtrlUtil.applyPagination(limit, page, dataResult);
    const result = CtrlUtil.getPagingFormat(dataResult, page, limit, total);
    return result;
  }
}

export default GetLaunchPadProjectFlow;
