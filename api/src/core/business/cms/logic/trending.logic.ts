export class BusinessTrending {
  static getHomeTrendings(datas: any) {
    return datas.map((c: any) => {
      return {
        _id       : c.c_id,
        key       : c.c_key,
        name      : c.c_name,
        symbol    : c.c_symbol,
        image     : c.c_image,
        price     : c.c_price     ? parseFloat(c.c_price)    : 0,
        volume24h : c.c_volume24h ? parseFloat(c.c_volume24h): 0,
        marketCap : c.c_marketCap ? parseFloat(c.c_marketCap): 0,
        chart     : c.c_chart,
        average24h: c.c_price && c.c_histPrices ? (c.c_price - c.c_histPrices['24H']?.USD) / c.c_histPrices['24H']?.USD: 0,
      };
    });
  }
}

export default BusinessTrending;
