import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Coin } from '../../core/schemas/home/coin';
import { BusinessCoinRule } from '../../core/business/block-ultra/rule/coin.rule';
import { AxiosService } from './axios.service';
import { UrlUtil } from '../../core/utils/url.util';

export class CoinService extends BaseService<Coin> {
  constructor(private readonly repo: Repository<Coin>) {
    super(repo);
  }

  async findByCoinKey(key: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ key });
    const result = await query.getOne();
    return result;
  }

  async findByCategory(categoryId: number): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ categoryId });
    query.orderBy('rank');
    const result = await query.getMany();
    return result;
  }

  async getCompare(coin_key: string, category: string): Promise<any> {
    const query = await this.repo.createQueryBuilder();
    query.where({ category });
    query.andWhere('key != :coin_key', { coin_key });
    query.orderBy('rank');
    query.select(BusinessCoinRule.SELECT_COMPARE);
    const result = await query.limit(5).getRawMany();
    return result;
  }

  async getRankCoinInCategory(coin_key: string): Promise<any> {
    const query = this.repo.createQueryBuilder('c');
    query
      .leftJoinAndSelect('coins', 'subquery', 'subquery.key = :key', {
        key: coin_key,
      })
      .where('c.category = subquery.category')
      .orderBy('c.rank', 'ASC');
    query.select(['c.rank', 'c.key']);
    const result = await query.getRawMany();
    if (result.length > 0) {
      const rankOfCoin = result.find((x) => x.c_key == coin_key);
      return rankOfCoin.c_rank;
    } else {
      return 0;
    }
  }

  async updateCoinDetail(coin: any): Promise<any> {
    if (coin.links && coin.description && coin.histData) {
      return coin;
    }

    const url = UrlUtil.getCoinDetail(coin.key);
    const response = await AxiosService.get(url);
    const coinDetail = response.data.data;
    const data = {
      ...coin,
      links: coinDetail.links,
      description: coinDetail.description,
      histData: coinDetail.histData,
    };
    await this.repo.update(coin._id, data);
    return coinDetail;
  }
}
