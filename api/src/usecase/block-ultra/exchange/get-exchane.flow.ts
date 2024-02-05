import { IExchangeSpot } from '../../../core/interfaces/exchange-spot';
import { UrlUtil } from '../../../core/utils/url.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetExchangeFlow {
  constructor(private readonly service: IExchangeSpot) {}
  async execute(key: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ key });
    const data = await query.getOne();
    if (
      data.foundationYear === null ||
      data.reserves === null ||
      data.nativeCoinKey === null ||
      data.links === null
    ) {
      const url = UrlUtil.getExchanges(key);
      const response = await AxiosService.get(url);
      data.foundationYear = response.data.foundationYear;
      data.reserves = response.data.reserves;
      data.nativeCoinKey = response.data.nativeCoinKey;
      data.links = response.data.links;
      await this.service.update(data);
    }
    return data;
  }
}
export default GetExchangeFlow;
