import { In, Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { CoinIeoIdo } from '../../core/schemas/coin-detail/ieo-ido/coin-ieo-ido';
import { UrlUtil } from '../../core/utils/url.util';
import { AxiosService } from './axios.service';

export class CoinIeoIdoService extends BaseService<CoinIeoIdo> {
  constructor(private readonly repo: Repository<CoinIeoIdo>) {
    super(repo);
  }

  async findIdoPrice(coin_key: string): Promise<any> {
    const query = this.repo.createQueryBuilder('c');
    query.where({ coin_key: coin_key, type: In(['ICO', 'IDO', 'IEO']) });
    query.orderBy('c.end', 'DESC');
    query.limit(1);
    query.addSelect(['c.price', 'c.type']);
    const result = await query.getRawOne();
    if (result) {
      return {
        type: result.type,
        price: result.price,
      };
    } else {
      return null;
    }
  }

  async getCountByKey(key: string): Promise<any> {
    const query = this.repo.createQueryBuilder();
    query.where({ coin_key: key });
    const total = await query.getCount();
    if (total > 0) {
      return total;
    } else {
      const url = UrlUtil.getCoinDetail(key);
      const response = await AxiosService.get(url);
      let datas = response.data.data.crowdsales;
      if (datas) {
        datas = datas.map((item: any) => {
          return {
            ...item,
            coin_key: key,
          };
        });
        await this.repo.save(datas);
        return datas.length;
      }
      return 0;
    }
  }
}
