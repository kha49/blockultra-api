import { Repository } from 'typeorm';
import { ExchangeDetailSpot } from '../../../core/schemas/exchange/exchange-detail-spot';
import { BaseService } from '../core/base.service';
import { AxiosService } from '../axios.service';
import { UrlUtil } from '../../../core/utils/url.util';

export class ExchangeDetailSpotService extends BaseService<ExchangeDetailSpot> {
  constructor(private readonly repo: Repository<ExchangeDetailSpot>) {
    super(repo);
  }

  async getExchangeDetailSpot(key: string){
    const query = await this.repo.createQueryBuilder("iip");
    if (key) query.where({ exchangeKey: key });
    const total = await query.getCount();
    if (total > 0) {
      query.leftJoin("coins", "hc", 'iip.coinKey = hc.key');
      const datas = await query.getMany(); 
      return datas;
    }
    else {
      const param = `customFilter=base_coin_is_not_derivative&exchangeKeys=${key}`;
      const url = UrlUtil.getTickers(param);
      const response = await AxiosService.get(url);
      let datas = response.data.data;
      await this.repo.save(datas);
      return datas;
    }
  }
}
