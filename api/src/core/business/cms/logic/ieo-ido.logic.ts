export class BusinessIeoIdo {
  static getLaunchPadDetailProjectUpcoming(datas: any) {
    let result: any = [];
    datas.forEach((item: any) => {
      const isHot = item.totalRaise > 20000000 && item.fundIds.includes(1);
      result.push({
        key             : item.key, 
        project         : item.name,
        initialCap      : item.initialMarketCap,
        totalRaise      : item.totalRaise,
        backers         : item.fundIds,
        category        : item.category,
        launchpads      : item.launchpads,
        start_date      : item.start_date,
        image           : item.image,
        symbol          : item.symbol,
        isHot           : isHot,
      });
    });
    return result;
  }

  static getLaunchPadDetailProjectEnded(datas: any, coins: any) {
    let result: any = []; 
    datas.forEach((item: any) => {
      const coin = coins.filter((x: any) => x.key == item.key);
      result.push({
        key             : item.key,
        project         : item.name,
        icon            : item.image,
        symbol          : item.symbol,
        currentPrice    : coin.price ||  0,
        totalRaised     : parseFloat(item.raise),
        roi             : parseFloat(item.roi),
        athRoi          : parseFloat(item.athRoi), 
        launchpads      : item.launchpads,
        endDate         : item.start_date
      });
    });
    return result;
  }

  static getIeoIdoUpcoming(datas: any) {
    let result: any = [];
    datas.forEach((item: any) => {
      const fundIds = item.funds.map((f: any) => f.tier);
      const isHot = item.totalRaise > 20000000 && fundIds.includes(1);
      result.push({
        project       : item.name,
        image         : item.image,
        symbol        : item.symbol,
        key           : item.key,
        initialCap    : item.initialCap,
        totalRaise    : item.totalRaise,
        backers       : item.funds,
        category_name : item.category_name,
        launchpads    : item.launchpads,
        start_date    : item.start_date,
        isHot         : isHot,
        price         : item.price,
        roi           : item.roi,
        auth_roi      : item.athRoi,
        updated_at    : item.updated_at,
      });
    });
    return result;
  }

  static getTopIdoLaunchPad(datas: any) {
    return datas.map((item: any) => {
      return {
        ido_platform_id : item.id,
        key             : item.key,
        name            : item.name,
        tier            : 1,
        icon            : item.icon,
        image           : item.image,
        roi             : parseFloat(item.avg_roi_current),
        athRoi          : parseFloat(item.avg_roi_ath),
        idos            : item.projectsCount,
        entry           : item.enterPrice,
        sumMarketCap    : item.marketCap,
        gainer          : item.gainers,
        loser           : item.losers,
      };
    });
  }

  static getLaunchPadDetail(l: any, idoVolume: any): any {
    if(!l){
      return null;
    }
    const launchPad = {
      name                    : l.name,
      foundationDate          : l.name,
      tokenPlatforms          : l.tokenPlatforms,
      nativeToken             : l.nativeToken,
      enterPrice              : l.enterPrice,
      priceChangeIn24h        : l.price && l.histPrices ? (l.price / l.histPrices['24H'].USD - 1) * 100 : null,
      links                   : l.links,
      totalFundsRaised        : l.totalFundsRaised,
      avgRoi                  : l.avgRoi,
      projectsCount           : l.projectsCount,
      avgRoiAth               : l.avgRoi.ath,
      categoriesDistribution  : l.categoriesDistribution,
      gainers                 : l.gainers,
      losers                  : l.losers,
      marketCap               : l.marketCap,
      volume24h               : l.volume24,
      marketCapChange         : idoVolume ? idoVolume.marketCapChange: null,
      volume                  : idoVolume ? idoVolume.volumn: null,
      volumeChange            : idoVolume ? idoVolume.volumeChange: null,
      dataChart               : idoVolume ? idoVolume.dataChart: null,
    };
    return launchPad;
  }
}

export default BusinessIeoIdo;
