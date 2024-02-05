import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { IBackerService }     from '../../../core/interfaces/backer';
import { ICoinService }       from '../../../core/interfaces/coin';
import { ICoinIeoIdoService } from '../../../core/interfaces/coin-ieo-ido'; 

export class GetCoinDetailFlow {
  constructor(
    private readonly coinService: ICoinService,
    private readonly coinIeoIdoService: ICoinIeoIdoService,
    private readonly backerService: IBackerService,
  ) {}
  async execute(coin_key: string) {
    const query = await this.coinService.getQueryBuilder();
    query.where('key = :coin_key', { coin_key });
    let coin = await query.getOne();
    if (!coin) { return null;}
    coin                      = await this.coinService.updateCoinDetail(coin);
    const rank_coin_in_wallet = await this.coinService.getRankCoinInCategory(coin.key);
    const compare             = await this.coinService.getCompare(coin_key, coin.category);
    const backers             = await this.backerService.getBackers(coin.fundIds);
    const idoPrice            = await this.coinIeoIdoService.findIdoPrice(coin.key);
    coin = BusinessCoin.getCoinDetail(coin, rank_coin_in_wallet, idoPrice, backers);
    const result = { ...coin, compare };
    return result;
  }
}

export default GetCoinDetailFlow;
