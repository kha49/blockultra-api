export class UrlUtil {
  public static getSocialsUrl(slug: string) {
    return `https://cryptorank.io/_next/data/Rn3S9BItuAF01NZD4O2VY/en/funds/${slug}/rounds.json?slug=${slug}`;
  }

  public static getUnicornsUrl() {
    return `https://codygarrison.notion.site/api/v3/queryCollection?src=initial_load`;
  }

  public static getGainerLoserUrl(param: string) {
    return `https://api.cryptorank.io/v0/analytics/gainers-losers-for-coins-group?${param}`;
  }

  public static getVolumnForCoinGroup(param: string) {
    return `https://api.cryptorank.io/v0/analytics/volume-for-coins-group?${param}`;
  }

  public static getTickers(param: string) {
    return `https://api.cryptorank.io/v0/tickers?status=active&category=spot&isTickersForPriceCalc=true&isTickersForVolumeCalc=true&${param}`;
  }

  public static getVesting(key: string) {
    return `https://api.cryptorank.io/v0/coins/vesting/${key}`;
  }

  public static getFundingRound(coin_key: string) {
    return `https://api.cryptorank.io/v0/funding-rounds/with-investors/by-coin-key/${coin_key}`;
  }

  public static getHistorical(coin_key: string, dateFrom: any, dateTo: any) {
    return `https://api.cryptorank.io/v0/coins/${coin_key}/historical?step=day&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }

  public static getExchanges(key: string) {
    return `https://api.cryptorank.io/v0/exchanges/${key}`;
  }

  public static getCoinDetail(key: string) {
    return `https://api.cryptorank.io/v0/coins/${key}?locale=en`;
  }
}
