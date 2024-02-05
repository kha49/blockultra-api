import { DateUtil } from '../../../utils/date.util';

export class BusinessCoinUnlock {
 
  static getUnlock(vesting: any, totalSupply: number, marketCap: number, coinPrice: number, status: string) {
    let batches     : any = [];
    let token_unlock: any = [];
    if(!vesting){ return []; }
    vesting.allocations.forEach((item: any) => {
      if(item.batches.length > 0){
        const indexDateNow = BusinessCoinUnlock.getIndexRecordUnlockNow(item.batches);
        const token   = item.tokens;
        const name    = item.name;
        let from      = indexDateNow;
        let to        = item.batches.length;
        if(status == "past"){
          from = 0;
          to   = indexDateNow
        }
        for (let index = from; index < to; index++) {
          const element     = item.batches[index];
          const totalToken  = token * (element.unlock_percent / 100);
          batches.push({
            ...element,
            token: totalToken,
            name: name
          })
        }
      } 
    }); 
    let dateCountMap: any = [];
    batches.forEach((item: any) => {
      const date = item.date.split('T')[0];
      dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    });

    const outputArray = Object.keys(dateCountMap)
    .map(date => ({
      key_date: date,
      count: dateCountMap[date]
    }))
    .sort((a, b) => new Date(a.key_date).getTime() - new Date(b.key_date).getTime());

    outputArray.forEach(item => {
      let remainingTime   = "";
      let tokens          = 0;
      const rounds: any   = [];
      for (let index = 0; index < batches.length; index++) {
        const element = batches[index];
        const date = element.date.split('T')[0];
        if(item.key_date == date){
          const unlockPerRound = (element.unlock_percent / 100) * element.token
          remainingTime  = element.date;
          tokens        += unlockPerRound;
          rounds.push({
            name: element.name,
            unlockPerRound: unlockPerRound
          })
        }
      }
      token_unlock.push({
        unlockDate         : remainingTime,
        token              : tokens,
        remainingTime      : remainingTime,
        tokensPercent      : tokens * totalSupply,
        value              : tokens * coinPrice,
        percentOfMarketCap : tokens * coinPrice / marketCap * 100,
        rounds             : rounds,
        numberOfRounds     : item.count,
      });
    });
    return token_unlock;
  }

  static calculatorUnlockedPercent(batches: any) {
    const indexDateNow = BusinessCoinUnlock.getIndexRecordUnlockNow(batches);
    let unlockedPercent = 0;
    for (let index = 0; index < indexDateNow; index++) {
      const element = batches[index];
      unlockedPercent += element.unlock_percent;
    }
    return unlockedPercent;
  }

  static getTokenUnlock(vesting: any, coinPrice: number, totalSupply: number, marketCap: number) {
    const totalScope        = BusinessCoinUnlock.calculatorTotalScope(vesting, totalSupply, marketCap, coinPrice);
    const unlocks           = !vesting ? {} : 
    vesting.allocations.map((item: any) => {
      const indexDateNow      = BusinessCoinUnlock.getIndexRecordUnlockNow(item.batches);
      const unlockedPercent   = BusinessCoinUnlock.calculatorUnlockedPercent( item.batches );

      const nextUnlockPercent = indexDateNow  < item.batches.length - 1 && item.batches.length > 0
                                              ? item.batches[indexDateNow + 1].unlock_percent 
                                              : null;
      const tgeUnlockPercent = item.batches.length > 0 && item.batches[0].is_tge ? item.batches[0].unlock_percent : null;
        return {
          name              : item.name,
          allocation        : item.tokens,
          allocationPercent : item.tokens_percent,
          unlockedPercent   : unlockedPercent,
          startDate         : item.batches.length > 0 ? item.batches[0].date : null,
          lockedPercent     : 100 - unlockedPercent,
          endDate           : item.batches.length > 0 ? item.batches[item.batches.length - 1].date : null,
          tgeUnlockPercent  : tgeUnlockPercent,
          tgeUnlockToken    : tgeUnlockPercent ? tgeUnlockPercent / 100 * coinPrice: null,
          nextUnlockPercent : nextUnlockPercent,
          nextUnlockToken   : nextUnlockPercent ? nextUnlockPercent / 100 * item.tokens : null,
          nextUnlockValue   : nextUnlockPercent ? nextUnlockPercent * item.tokens * coinPrice : null,
          timer             : item.batches.length > 0 && indexDateNow < item.batches.length - 1 ? item.batches[indexDateNow + 1].date : null,
        };
    })

    return { ...totalScope, unlocks };
  }

  static calculatorTotalNextUnlockPercent(vesting: any) {
    let totalUnlockPercent = 0;
    let dates: any = [];
    for (let index = 0; index < vesting.allocations.length; index++) {
      const allocation = vesting.allocations[index];
      if(allocation.batches.length == 0) continue;
      const indexDateNow = BusinessCoinUnlock.getIndexRecordUnlockNow(allocation.batches);
      const date         = indexDateNow < allocation.batches.length ? allocation.batches[indexDateNow].date: null;
      if (date) {
        if (dates.length > 0) {
          const type = DateUtil.compareTwoDate(date, dates[0].date);
          if (type == 1) {
            dates.push({ index, date: date });
          } else if (type == 2) {
            dates = [{ index, date: date }];
          }
        } else {
          dates = [{ index, date: date }];
        }
      }
    }

    if (dates.length > 1) {
      for (let index = 0; index < dates.length; index++) {
        const element         = dates[index];
        const indexDateNow    = BusinessCoinUnlock.getIndexRecordUnlockNow(vesting.allocations[element.index].batches);
        const round_token     = vesting.allocations[element.index].tokens;
        const unlock_percent  = vesting.allocations[element.index].batches[indexDateNow].unlock_percent;
        totalUnlockPercent    = round_token && unlock_percent ? totalUnlockPercent +  (parseFloat(round_token) * (unlock_percent/ 100)): 0;
      }
    }
    return totalUnlockPercent;
  }

  static calculatorTotalScope(data: any, totalSupply: number, marketCap: number, coinPrice: number) {
    if (!data) return {}
    let totalRemainingTime    = "";
    let remainingTime         = "";
    const currentDate         = new Date(); 
    const formattedDate       = currentDate.toISOString();
    let maxDate               = formattedDate;
    let maxDateRemainingTime  = formattedDate;
    let totalUnlockedToken    = 0;

    data.allocations.forEach((element: any) => {
      if(element.batches.length > 0){
        const unlockedPercent = BusinessCoinUnlock.calculatorUnlockedPercent(element.batches);
        const type            = DateUtil.compareTwoDate(maxDate,element.batches[element.batches.length - 1]);
        maxDate               = type == 1 || type == 3? maxDate : element.batches[element.batches.length - 1]?.date;
        totalRemainingTime    = maxDate;
        totalUnlockedToken    = totalUnlockedToken + (unlockedPercent / 100 ) * parseFloat(element.tokens); 
        const indexDateNow    = BusinessCoinUnlock.getIndexRecordUnlockNow(element.batches);
        maxDateRemainingTime  = type == 1 || type == 3 ? maxDate : element.batches[indexDateNow]?.date;
        remainingTime         = maxDateRemainingTime;
      } 
    });
    const totalNextUnlockToken   = BusinessCoinUnlock.calculatorTotalNextUnlockPercent(data);
    const totalNextUnlockPercent = (totalNextUnlockToken / totalSupply) * 100;
    const totalNextUnlockValue   = totalNextUnlockToken                 * coinPrice;
    const totalUnlockedPercent   = (totalUnlockedToken / totalSupply)   * 100;
    const totalLockedPercent     = 100 - totalUnlockedPercent;
    const totalUnlockedValue     = (totalUnlockedPercent * totalSupply) * coinPrice;
    const totalLockedToken       = (totalLockedPercent / 100)           * totalSupply;
    const totalLockedValue       = totalLockedToken                     * coinPrice;
    const percentOfMarketCap     = (totalNextUnlockValue / marketCap)   * 100;

    return {
      totalRemainingTime,
      totalUnlockedPercent,
      totalUnlockedToken,
      totalUnlockedValue,
      totalLockedPercent,
      totalLockedToken,
      totalLockedValue,
      totalNextUnlockPercent,
      totalNextUnlockToken,
      totalNextUnlockValue,
      remainingTime,
      percentOfMarketCap,
    };
  }

  static getIndexRecordUnlockNow(batches: any) {
    const date = new Date(); 
    let indexDateNow = batches.length;
    for (let index = 0; index < batches.length; index++) {
      const element = batches[index];
      const batchDate   = new Date(element.date); 
      if (date <= batchDate) {
        indexDateNow = index;
        break;
      }
    }
    return indexDateNow;
  }
}

export default BusinessCoinUnlock;
