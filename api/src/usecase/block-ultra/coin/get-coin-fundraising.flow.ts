import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { ICoinFundraisingService } from '../../../core/interfaces/coin-fundraising';
import { UrlUtil } from '../../../core/utils/url.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetCoinFundraisingFlow {
  constructor(private readonly service: ICoinFundraisingService, private readonly coinService: ICoinService) {}
  async execute(coin_key: string) {
    const query = await this.service.getQueryBuilder();
    query.where({ coin_key });
    const coinQuery = await this.coinService.getQueryBuilder();
    coinQuery.where({key: coin_key});
    coinQuery.select(["price", '"totalSupply"', '"athPrice"']);
    const coin  = await coinQuery.getRawOne();
    const total = await query.getCount();
    if (total > 0) {
      let datas = await query.getMany();
      datas = BusinessCoin.getCoinFundraising(datas, coin);
      return datas;
    } else {
      const url = UrlUtil.getFundingRound(coin_key);
      const response = await AxiosService.get(url);
      if (response.data.length == 0) {
        return [];
      }
      let datas = response.data;
      datas = datas.map((x: any) => {
        x.coin_key = coin_key;
        return x;
      });
      const batchSize = 1000;
      await this.service.batchInsert(datas, batchSize);
      datas = BusinessCoin.getCoinFundraising(datas, coin);
      return datas;
    }
  }
}

export default GetCoinFundraisingFlow;
