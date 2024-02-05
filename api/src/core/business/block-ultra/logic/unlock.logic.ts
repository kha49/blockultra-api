import { DateUtil } from '../../../utils/date.util';

export class BusinessUnlock { 

  static getDataUnlockOnHead(datas: any) {
    let nextUnlockThisWeek = 0;
    let nextUnlockNextWeek = 0;
    let top4NextUnlockThisWeek: any = [];
    let top4NextUnlockNextWeek: any = [];
    datas.forEach((item: any) => {
      let totalUnlockTokenThisWeek = 0;
      let totalUnlockTokenNextWeek = 0;
      item.nextunlocks.forEach((element: any) => {
        const date = new Date(element.date);
        const isInWeek   = DateUtil.checkDateIsInWeek(date, 0);
        const isNextWeek = DateUtil.checkDateIsInWeek(date, 7);
        if (isInWeek) {
          totalUnlockTokenThisWeek += element.tokens;
        } else if (isNextWeek) {
          totalUnlockTokenNextWeek += element.tokens;
        }
      });
      totalUnlockTokenThisWeek = totalUnlockTokenThisWeek * parseFloat(item.price);
      totalUnlockTokenNextWeek = totalUnlockTokenNextWeek * parseFloat(item.price);
      nextUnlockThisWeek      += totalUnlockTokenThisWeek;
      nextUnlockNextWeek      += totalUnlockTokenNextWeek;

      if (top4NextUnlockThisWeek.length < 4 && totalUnlockTokenThisWeek) {
        top4NextUnlockThisWeek.push({
          key: totalUnlockTokenThisWeek,
          value: item,
        });
      } else if (
        totalUnlockTokenThisWeek && top4NextUnlockThisWeek.length == 4
      ) {
        top4NextUnlockThisWeek = top4NextUnlockThisWeek.sort((a: any, b: any) => b.key - a.key);
        if (top4NextUnlockThisWeek[3].key < top4NextUnlockThisWeek) {
          top4NextUnlockThisWeek[3] = {
            key: totalUnlockTokenThisWeek,
            value: item,
          };
        }
      }
      if (top4NextUnlockNextWeek.length < 4 && totalUnlockTokenNextWeek) {
        top4NextUnlockNextWeek.push({
          key: totalUnlockTokenNextWeek,
          value: item,
        });
      } else if (
        totalUnlockTokenNextWeek && top4NextUnlockNextWeek.length == 4
      ) {
        top4NextUnlockNextWeek = top4NextUnlockNextWeek.sort((a: any, b: any) => b - a);
        if (top4NextUnlockNextWeek[3].key < totalUnlockTokenNextWeek) {
          top4NextUnlockNextWeek[3] = {
            key: totalUnlockTokenNextWeek,
            value: item,
          };
        }
      }
    });

    top4NextUnlockThisWeek = top4NextUnlockThisWeek.map((item: any) => {
      return {
        key       : item.value.key,
        symbol    : item.value.symbol,
        image     : item.value.image,
        name      : item.value.name,
        price     : item.value.price,
        marketcap : item.value.marketcap,
        nextUnlockDate  : item.value.nextunlocks.length > 0 ? item.value.nextunlocks[0].date : null
      };
    });

    top4NextUnlockNextWeek = top4NextUnlockNextWeek.map((item: any) => {
      return {
        key       : item.value.key,
        symbol    : item.value.symbol,
        image     : item.value.image,
        name      : item.value.name,
        price     : item.value.price,
        marketcap : item.value.marketcap,
        nextUnlockDate  : item.value.nextunlocks.length > 0 ? item.value.nextunlocks[0].date : null
      };
    });

    return {
      nextUnlockThisWeek,
      nextUnlockNextWeek,
      top4NextUnlockThisWeek,
      top4NextUnlockNextWeek,
    };
  }

  static getUnlockProps(datas: any): any {
    return datas.map((item: any) => {
      const totalTokens = item.nextunlocks.reduce((total: number, unlock: any) => total + unlock.tokens,0);
      return {
        image                 : item.image,
        name                  : item.name,
        key                   : item.key,
        symbol                : item.symbol,
        price                 : parseFloat(item.price),
        priceChangeIn24h      : (parseFloat(item.price) / item.histprices['24H'].USD - 1) * 100,
        marketCap             : parseFloat(item.marketcap),
        launchpads            : item.launchpads,
        roi                   : item.roi,
        unlockedTokensPercent : parseFloat(item.unlockedtokenspercent),
        nextTokenPrice        : totalTokens * parseFloat(item.price),
        nextTokenPricePercent : ((totalTokens * parseFloat(item.price)) /  parseFloat(item.marketcap)) * 100,
        nextUnlockDate        : item.nextunlocks[0].date,
        unlockedTokens        : parseFloat(item.unlockedtokens),
        lockedTokens          : parseFloat(item.lockedtokens),
        lockedTokensPercent   : parseFloat(item.lockedtokenspercent),
      };
    });
  }
}

export default BusinessUnlock;
