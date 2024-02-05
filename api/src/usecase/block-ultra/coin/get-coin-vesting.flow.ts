import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { IAllocationService } from '../../../core/interfaces/allocation';
import { IVestingService } from '../../../core/interfaces/vesting';
import { UrlUtil } from '../../../core/utils/url.util';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetCoinVestingFlow {
  constructor(
    private readonly service: IVestingService,
    private readonly allocationService: IAllocationService,
  ) {}
  async execute(coin_key: string) {
    const query = await this.service.getQueryBuilder('v');
    query.where({ coin_key });
    const total = await query.getCount();
    if (total > 0) { 
      query.leftJoinAndSelect('v.allocations', 'a')
      const data = await query.getOne();

      const chart = BusinessCoin.getTokenomicChart(data);
      return {
        chart,
        datas: data,
      };
    } else {
      const apiUrl = UrlUtil.getVesting(coin_key);
      const response = await AxiosService.get(apiUrl);
      if (!response.data.data) {
        return [];
      }
      const vesting = response.data.data.vesting;
      const allocations = response.data.data.allocations;
      if (vesting && allocations) {
        vesting.coin_key = coin_key;
        const vestingCreated = await this.service.create(vesting);
        const dataInsert = allocations.map((item: any) => {
          return { ...item, vesting: vestingCreated };
        });
        await this.allocationService.create(dataInsert);
        const result = {
          ...vesting,
          allocations: dataInsert,
        };
        return result;
      } else {
        return null;
      }
    }
  }
}

export default GetCoinVestingFlow;
