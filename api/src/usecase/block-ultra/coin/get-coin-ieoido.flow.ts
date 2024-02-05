import { In } from 'typeorm';
import BusinessCoin from '../../../core/business/block-ultra/logic/coin.logic';
import { ICoinService } from '../../../core/interfaces/coin';
import { ICoinIeoIdoService } from '../../../core/interfaces/coin-ieo-ido';

export class GetCoinIeoIdoFlow {
  constructor(private readonly service: ICoinIeoIdoService, private readonly coinService: ICoinService) {}
  async execute(coin_key: string) {
    const query = await this.service.getQueryBuilder("cii");
    query.where({ coin_key, type: In(["IDO", "IEO", "ICO"]) });

    query.leftJoin("ido_ieo_top_ido_launch_pad", "iitilp", "cii.idoPlatformKey = iitilp.key")
      .where("cii.coin_key = :coin_key", { coin_key })
      .andWhere("cii.type IN (:...types)", { types: ["IDO", "IEO", "ICO"] })
      .select(['cii.*', 'iitilp.name', 'iitilp.icon']);
    let datas = await query.getRawMany();
    
    const coinQuery = await this.coinService.getQueryBuilder();
    coinQuery.where({key: coin_key});
    coinQuery.select(["price", '"totalSupply"', '"athPrice"']);
    const coin  = await coinQuery.getRawOne();
    datas = BusinessCoin.getCoinIeoIdo(datas, coin);
    return datas;
  }
}

export default GetCoinIeoIdoFlow;
