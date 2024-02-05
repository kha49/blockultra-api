import BusinessCoinUnlock from '../../../core/business/block-ultra/logic/coin-unlock.logic';
import { IVestingService } from '../../../core/interfaces/vesting';
import { UrlUtil } from '../../../core/utils/url.util';
import { AllocationService } from '../../../infrastructure/services/allocation.service';
import { AxiosService } from '../../../infrastructure/services/axios.service';

export class GetCoinDetailUnlockFlow {
  constructor(
    private readonly service: IVestingService,
    private readonly allocationService: AllocationService,
  ) {}
  async execute(coin: any, status: string) {
    let query = await this.service.getQueryBuilder('vesting');
    query.leftJoinAndSelect('vesting.allocations', 'allocations');
    query.where({ coin_key: coin.key });
    let token_unlock = await query.getOne();

    if (!token_unlock) {
      const url = UrlUtil.getVesting(coin.key);
      const response = await AxiosService.get(url);
      if (response?.data?.data?.vesting) {
        const vesting = {
          ...response.data.data.vesting,
          coin_key: coin.key,
        };
        await this.service.create(vesting);
        let allocations = response.data.data.allocations;
        allocations = allocations.map((item: any) => {
          return {
            ...item,
            vesting: vesting,
          };
        });
        await this.allocationService.create(allocations);
        token_unlock = {
          ...response.data.data.vesting,
          allocations: response.data.data.allocations,
        };
      }
    }
    let response = null;
    const coinPrice         = parseFloat(coin.price); 
    const totalSupply       = coin.maxSupply ? parseFloat(coin.maxSupply) : parseFloat(coin.totalSupply);
    const marketCap         = parseFloat(coin.marketCap);
    
    if(token_unlock){
      if (status == 'round') {
        response = BusinessCoinUnlock.getTokenUnlock(token_unlock, coinPrice, totalSupply, marketCap);
      } else {
        response = BusinessCoinUnlock.getUnlock(token_unlock, coinPrice, totalSupply, marketCap, status);
      }
    }

    return response;
  }
}

export default GetCoinDetailUnlockFlow;
