import { Repository } from 'typeorm';
import { BaseService } from './core/base.service';
import { Backer } from '../../core/schemas/backer';
import BusinessBackerRule from '../../core/business/block-ultra/rule/backer.rule';
import { AxiosService } from './axios.service';
import { DateUtil } from '../../core/utils/date.util';
import { CommonUtil } from '../../core/utils/common.util';
import { UrlUtil } from '../../core/utils/url.util';

export class BackerService extends BaseService<Backer> {
  constructor(private readonly repo: Repository<Backer>) {
    super(repo);
  }

  async getBackers(fund_ids: any): Promise<any> {
    if (!fund_ids) {
      return [];
    }
    const query = await this.repo.createQueryBuilder();
    query.where('id IN (:...fund_ids)', { fund_ids });
    query.select(BusinessBackerRule.GET_BACKERS_PROPS);
    const result = await query.getRawMany();
    return result;
  }

  async getSocials(slug: string) {
    try {
      const url = UrlUtil.getSocialsUrl(slug);;
      const response = await AxiosService.get(url);
      return response ? response.data.pageProps.fund : {};
    } catch (error) {}
  }

  async getUnicorns() {
    try {
      const url = UrlUtil.getUnicornsUrl();
      const headers = {
        headers: {
          dnt: '1',
          'content-type': 'application/json',
        },
      };
      const data = {
        collectionView: {
          id: '67d7dc4c-3c5e-4ddb-9a3a-ec94ac34aa0e',
          spaceId: '15e8dcd2-5b80-4469-8ea1-0882ad4f1b53',
        },
        source: {
          type: 'collection',
          id: '904d93db-aeb9-4442-ae24-3759d6961c01',
          spaceId: '15e8dcd2-5b80-4469-8ea1-0882ad4f1b53',
        },
        loader: {
          type: 'reducer',
          reducers: {
            collection_group_results: { type: 'results', limit: 50 },
          },
          sort: [],
          searchQuery: '',
          userTimeZone: 'Asia/Saigon',
        },
      };
      const response = await AxiosService.post(url, headers, data);
      return response ? response.data.recordMap.block : {};
    } catch (error) {}
  }

  async fetchGainerLoser(datas: any): Promise<any> {
    const dateNow = DateUtil.getCurrentDate(0, 0);
    let dataUpsert = [];
    for (let index = 0; index < datas.length; index++) {
      const element = datas[index];
      if (!element.gainers && element.try_update_gainer == 0) {
        const fundId = element.id;
        const param = `from=${dateNow}&fundId=${fundId}`;
        const url = UrlUtil.getGainerLoserUrl(param);
        const response = await AxiosService.get(url);
        element.gainers = response.data.data.gainers;
        element.losers = response.data.data.losers;
        element.try_update_gainer = 1;
        dataUpsert.push(element);
        await CommonUtil.delay(1000);
      }
    }
    if (dataUpsert.length > 0) {
       this.repo.save(dataUpsert);
    }
    return datas;
  }

  async fetchMarketCap(datas: any): Promise<any> {
    const dateNow = DateUtil.getCurrentDate(1, 0);
    let dataUpsert = [];
    for (let index = 0; index < datas.length; index++) {
      const element = datas[index];
      if (element.market_caps?.length == 0 && element.try_update_market_cap == 0) {
        const fundId = element.id;
        const param = `fundId=${fundId}&from=${dateNow}`
        const url = UrlUtil.getVolumnForCoinGroup(param);
        const response = await AxiosService.get(url);
        element.market_caps = response.data.data;
        element.try_update_market_cap = 1;
        dataUpsert.push(datas[index]);
        await CommonUtil.delay(1000);
      }
    }
    if (dataUpsert.length > 0) {
      await this.repo.save(dataUpsert);
    }

    return datas;
  }
}
