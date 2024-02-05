import { DateUtil } from '../../../utils/date.util';

export class BusinessCoin {
  static getTokenomicChart(vesting: any) {
    let series: any = [];
    let { firstDate, lastDate } = DateUtil.getDateMaxMin(vesting);

    vesting.allocations.forEach((allocation: any) => {
      let times: any = [];
      let tokens: any = [];

      if (firstDate) {
        let fDate = new Date(firstDate);
        let lastToken = 0
        while (fDate < lastDate) {
          times.push(new Date(fDate));
          let token = 0;
    
          allocation.batches.forEach((x: any) => {
            const batchDate = new Date(x.date);
            const formattedBatchDate = batchDate.toISOString().split('T')[0];
            const formattedFirstDate = fDate.toISOString().split('T')[0];
            if(formattedBatchDate == formattedFirstDate){
              token = (x.unlock_percent * parseInt(allocation.tokens)) / 100;
            }
          }); 
          const totalToken = token + lastToken;
          tokens.push(totalToken);
          lastToken = totalToken; 
          fDate.setDate(fDate.getDate() + 1);
        }
      }

      series.push({
        name: allocation.name,
        type: 'line',
        stack: 'Total',
        label: { show: false, position: 'top' },
        areaStyle: {},
        emphasis: { focus: 'series' },
        times: times,
        tokens: tokens,
      });
    });
    return series;
  }

  static getCoinInList(datas: any) {
    return datas.map((c: any) => {
      const price = c.price ? parseFloat(c.price) : 0;
      const coin = {
        _id: c._id,
        key: c.key,
        icon: c.icon,
        name: c.name,
        image: c.image,
        symbol: c.symbol,
        price: price,
        rank: c.rank,
        category: c.category,
        average24h: price && c.histPrices && c.histPrices["24h"] && c.histPrices["24h"]["USD"] ?(price - c?.histPrices['24H']['USD']) / c?.histPrices['24H']['USD'] : 0,
        volume24h: parseFloat(c.volume24h),
        marketCap: parseFloat(c.marketCap),
        atlPrice: c.atlPrice,
        chart: c.chart || null,
        priceChangeIn24h: price
          ? (price / c?.histPrices['24H']['USD'] - 1) * 100
          : 0,
      };
      return coin;
    });
  }

  static getCoinDetail(
    c: any,
    rank_coin_in_wallet: any,
    idoPrice: any,
    backers: any
  ): any {
    const coin = {
      key: c.key,
      name: c.name,
      image: c.image,
      symbol: c.symbol,
      rank: c.rank,
      category: c.category,
      wallet: rank_coin_in_wallet,
      rank_coin_in_category: null,
      price: c.price ? parseFloat(c.price): 0,
      price_change_in_24h: c.price && c.histPrices && c.histPrices["24h"] && c.histPrices["24h"]["USD"] ? (c.price / c.histPrices['24H']['USD'] - 1) / 100: 0,
      tokens: c?.tokens,
      listingDate: c?.listingDate,
      idoPrice: idoPrice?.price || null,
      idoPriceType: idoPrice?.type || null,
      price_change_24h: idoPrice && idoPrice.price && c.price ? (c?.price / idoPrice?.price - 1) / 100 : null,
      icon: c.icon,
      atlPrice: c.atlPrice,
      athPrice: c.athPrice,
      marketCap: c.marketCap,
      volume24h: c.volume24h,
      volMCap24h: c.volume24h && c.marketCap ? c.volume24h / c.marketCap: 0,
      fdv: c.fullyDilutedMarketCap,
      circ: c.totalSupply && c.percentOfCircSupply ? c.totalSupply * c.percentOfCircSupply: 0,
      percentOfCircSupply: c.percentOfCircSupply,
      totalSupply: c.totalSupply,
      backers: backers,
      rate: '5.0',
      links: c.links,
      tagIds: c.tagIds,
      description: c.description,
      histData: c.histData,
    };
    return coin;
  }

  static getMarketSpot(datas: any) {
    return datas.map((c: any) => {
      const coin = {
        _id: c._id,
        key: c.coinkey,
        icon: c.exchangeIcon,
        name: c.exchangeName,
        image: c.image,
        tier: 1,
        pair: c.symbol,
        price: c.usdLast,
        volume24h: c.usdVolume,
        marketShare: c.exchangePercentVolume,
      };
      return coin;
    });
  }

  static getCoinFundraising(datas: any, coin: any) {
    let backerLeadCount = 0;
    const fundraisings = datas.map((c: any) => {
      const totalSupply   = coin.totalSupply ? parseFloat(coin.totalSupply) : 0;
      const coinPrice     = coin.price ? parseFloat(coin.price): null;
      const coinAthPrice  = coin.athPrice['USD'];
      const price = c.valuation ? (c.valuation / totalSupply) * 100 : null;
      const tokensOffered = price ? c.raise / price : null;

      const fundraising = {
        type: c.type,
        date: c.date,
        linkToAnnouncement: c.linkToAnnouncement,
        price: price,
        valuation: c.valuation,
        raised: c.raise,
        tokensOffered: price ? c.raise / price : null,
        percenOfTokens: tokensOffered && totalSupply ? (tokensOffered / totalSupply) * 100 : null,
        roi: price && coinPrice ? coinPrice / price : null,
        athROI: price && coinAthPrice ? coinAthPrice / price : null,
        unlockedPercent: null,
        unlockedTokens: null,
        unlockedValue: null,
        backersCount: c.investors ? c.investors.length: 0,
      };

      let backers: any = [];
      c.investors.forEach((element: any) => {
        backerLeadCount += element.type == 'LEAD' ? 1 : 0;
        backers.push({
          logo: element.logo,
          type: element.type,
          name: element.name,
          tier: element.tier,
        });
      });
      const result = { ...fundraising, backers };
      return result;
    });

    const overview: any = {
      totalFundRaised: 0,
      avgPrice: 0,
      rounds: 0,
      leadBackers: backerLeadCount,
      pricePerRoundName: '',
      pricePerRoundPrice: '',
      strategic: '',
      seed: '',
      pre_seed: '',
      round_number: 3,
      backers_count: 0,
      backers: [],
    };

    let totalPrice = 0;
    fundraisings.forEach((f: any) => {
      totalPrice += f.price;
      overview.totalFundRaised += parseFloat(f.raised);
      overview.backers_count += f.backersCount;

      f.backers.forEach((b: any) => {
        if (overview.backers.length < 5) {
          overview.backers.push(b);
        }
      });
    });

    overview.avgPrice = totalPrice / fundraisings.length;
    return { overview, fundraisings };
  }

  static getCoinIeoIdo(datas: any, coin: any) {
    const ieoidos: any = [];
    const totalSupply = parseFloat(coin.totalSupply);
    const coinPrice = parseFloat(coin.price);
    const coinAthPrice = coin.athPrice['USD'];

    datas.forEach((e: any) => {
      ieoidos.push({
        key: e.idoPlatformKey,
        logo: e.iitilp_icon,
        name: e.iitilp_name,
        type: e.type,
        time_start: e.start,
        time_end: e.end,
        time_link: null,
        price: e.price,
        valuation: coinPrice && totalSupply ? coinPrice * totalSupply: 0,
        raised: e.raise.USD,
        tokensOffered : e.tokensForSale ? parseFloat(e.tokensForSale): 0,
        percenOfTokens: e.tokensForSale && totalSupply ? (parseFloat(e.tokensForSale) / totalSupply) * 100: 0,
        roi: coinPrice && e.price ? coinPrice / e.price: 0,
        athROI: coinAthPrice && e.price ? coinAthPrice / e.price: 0,
        unlockedPercent: 'null',
        unlockedTokens: 'null',
        unlockedValue: 'null',
      });
    });

    const overview: any = {
      totalRaise: 0,
      avgPrice: 0,
      totalTokensOffered: 0,
      percentOfToken: 0,
      backer_count: 0,
      backers: [],
    };

    let totalPrice = 0;
    ieoidos.forEach((item: any) => {
      totalPrice += item.price;
      overview.totalRaise += parseFloat(item.raised);
      overview.totalTokensOffered += parseFloat(item.tokensOffered);
    });

    overview.percentOfToken = coin.totalSupply * 100;
    overview.avgPrice = totalPrice / ieoidos.length;
    overview.backer_count = datas.length;
    const response = {
      overview: overview,
      ieoidos: ieoidos,
    };
    return response;
  }
}

export default BusinessCoin;
