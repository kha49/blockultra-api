import { StringUtil } from '../../../utils/str.util';
export class BusinessExchange {

  static getAllocations(datas: any){
    const mergeData:any = {};
    const returnData:any = [];

    datas.forEach((e: any) => {
      if (mergeData[e.coinKey]) {
        mergeData[e.coinKey] = e.usdVolume ? parseFloat(e.usdVolume) : 0;
        const findExistsData = returnData.find((data:any) => data.coinKey === e.coinKey)
        if (findExistsData) {
          findExistsData.usdVolume += mergeData[e.coinKey]
        }
      } else {
        if (returnData.length < 10) {
          mergeData[e.key] = e.usdVolume ? parseFloat(e.usdVolume) : 0;
          const data = {
            coinName              : e.coinName,
            coinKey               : e.coinKey,
            symbol                : e.symbol,
            usdLast               : e.usdLast ? parseFloat(e.usdLast) : 0,
            changePercent         : e.changePercent ? parseFloat(e.changePercent) : 0,
            usdVolume             : e.usdVolume ? parseFloat(e.usdVolume) : 0,
            exchangePercentVolume : e.exchangePercentVolume ? parseFloat(e.exchangePercentVolume) : 0,
            percentUsdVolume      : 0,
          }
          returnData.push(data);
        }
      }
    });
    const totalCoins = returnData.reduce((sum: number, a: any) =>sum + (a.usdVolume ? parseFloat(a.usdVolume) : 0),0);
    returnData.forEach((e: any) => e.percentUsdVolume = ((e.usdVolume ? parseFloat(e.usdVolume) : 0) / totalCoins) * 100);
    return {
      totalCoins: totalCoins,
      allocations: returnData
    };
  }

  static getExchangeDetail(data: any, allocations: any, totalCoins: any, coin: any){
    return {
      icon                     : data.icon,
      name                     : data.name,
      tier                     : 1,
      yearOfFoundation         : data.foundationYear,
      country                  : data.country,
      links                    : data.links,
      marketShare              : parseFloat(data.percentVolume),
      financialReserves        : parseFloat(data.reserves),
      coinsCount               : parseInt(data.currenciesCount),
      pairsCount               : parseInt(data.pairsCount),
      nativeCoin               : coin ? {
                                    key: data.nativeCoinKey,
                                    logo : coin ? coin.image.icon : "",
                                    name : coin ? coin.name : ""
                                 }: null,
      fees                     : "",
      tokenAllocation          : allocations,
      spotTradingVolume        : {
                                    usd     :  data.reportedVolumes.day.toUSD,
                                    percent : (data.reportedVolumes.day.toBTC / data.reportedVolumes.day.toBTC - 1) * 100,
                                    btc     :  data.reportedVolumes.day.toBTC
                                 },
      totalUsdVolume           : totalCoins
    }
  }
  static getExchangeSpotList(datas: any, data24HoursAgo: any) {
    return datas.map((c: any) => {
      const dataYesterDay    = data24HoursAgo.find((x: any) => x.key == c.key);
      const volumn24hPercent = dataYesterDay ? (c.reportedVolumes.day.toUSD/ dataYesterDay.reportedVolumes.day.toUSD - 1) * 100: 0;
      return {
        _id              : c._id,
        key              : c.key,
        icon             : c.icon, 
        name             : c.name,
        tier             : 1,
        volume24h        : c.volume24h,
        volumn24hPercent : volumn24hPercent,
        currenciesCount  : c.currenciesCount,
        country          : c.country,
        percentVolume    : c.percentVolume,
        dataChart        : c.dataChart
      };
    });
  }

  static getExchangeDetailSpotList(datas: any) {
    return datas.map((c: any) => {
      return {
        key               : c.coinkey,
        logo              : c.image ? c.image.icon: "",
        name              : StringUtil.getValueNotInParentheses(c.coinname),
        ticker            : StringUtil.getValueInParentheses(c.coinname),
        rate              : "",
        pair              : c.symbol,
        price             : parseFloat(c.usdlast),
        priceChangeIn24h  : parseFloat(c.changepercent),
        volume            : parseFloat(c.usdvolume),
        volumeChangeIn24h : parseFloat(c.exchangepercentvolume)
      };
    });
  }
}

export default BusinessExchange;
