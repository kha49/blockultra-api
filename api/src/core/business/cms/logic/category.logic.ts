export class BusinessCategory {
  static getDetail(c: any): any {
    return {
      _id: c._id,
      id: c.id,
      slug: c.slug,
      name: c.name,
      gainers: c.gainers,
      losers: c.losers,
      market_cap: c.market_cap,
      volume24h: c.volume24h,
    };
  }
  static getHomeCategories(datas: any) {
    return datas.map((c: any) => {
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        market_cap: c.market_cap,
        volume24h: c.volume24h,
        dominance: c.dominance,
        gainers: c.gainers,
        losers: c.losers,
        avgPriceChange: c.avgPriceChange,
        marketCapChangeIn24h: (c.market_cap / c.yesterday.marketCap - 1) * 1000,
        volumeChangeIn24h: (c.volume24h / c.yesterday.volume24h - 1) * 1000,
      };
    });
  }
  static getCatesBacker(datas: any, funds: any) {
    return datas.map((c: any) => {
      const findFund = funds.filter(
        (fund: any) => fund.category === c.name,
      );
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        count: findFund.length,
      };
    });
  }

  static getCoinInList(datas: any) {
    return datas.map((c: any) => {
      return {
        id: c.id,
        key: c.key,
        image: c.image,
        name: c.name,
        symbol: c.symbol,
        price: c.price ? parseFloat(c.price): 0,
        priceChangeIn24h: c.price && c.histPrices && c.histPrices["24H"] ?  (parseFloat(c.price) / c.histPrices["24H"]["USD"] - 1) / 100: 0,
        volume24h: c.volume24h,
        marketCap: c.marketCap,
        chart: c.chart,
      };
    });
  }
}

export default BusinessCategory;
