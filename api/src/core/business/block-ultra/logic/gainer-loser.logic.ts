export class BusinessGainerLoser {
  static getGainerLoserProps(datas: any) {
    return datas.map((c: any) => {
      return {
        key: c.key,
        name: c.name,
        price: c.price ? parseFloat(c.price): 0,
        priceChangeIn24: c.price
          ? (parseFloat(c.price) / c?.histPrices['24H']['USD'] - 1) * 100
          : 0,
        volume24h: c.volume24h ? parseFloat(c.volume24h): 0,
        image: c.image,
        symbol: c.symbol,
      };
    });
  }
  static getGainerPercent(gainer: number, loser: number) {
    return (gainer / (gainer + loser)) * 100;
  }

  static getLoserPercent(gainer: number) {
    return 100 - gainer;
  }
}

export default BusinessGainerLoser;
