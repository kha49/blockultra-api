import { DateUtil } from "../../../utils/date.util";

export class BusinessCategoryVolume {
  static calculatorVolume(categoryVolumes: any, time: string){ 

    const marketCap       = BusinessCategoryVolume.getMarketCap(categoryVolumes, time);
    const marketCapChange = BusinessCategoryVolume.getMarketCapChange(categoryVolumes, time);
    const volumeChange    = BusinessCategoryVolume.getVolumeChange(categoryVolumes, time);
    const marketChart     = BusinessCategoryVolume.getDataChart(categoryVolumes, time);
    const volume          = BusinessCategoryVolume.getVolume(categoryVolumes, time);

    return {
      marketCap       : marketCap,
      marketCapChange : marketCapChange,
      volume          : volume,
      volumeChange    : volumeChange,
      dataChart       : marketChart,
    };
  } 

  static getMarketCap(categoryVolumes: any, time: string){
    if ( categoryVolumes.length > 0 ){
      let index        = categoryVolumes.length - 24;
      const lastConst  = categoryVolumes[categoryVolumes.length - 1];
      switch (time) {
        case "7d": 
          index = categoryVolumes.length - 7 * 24; 
          break;
        case "1m":
            const getDayInMonth = DateUtil.getDayInPrevMonth(); 
            index = categoryVolumes.length - getDayInMonth * 24;  
          break;
      }
      const categoryVolume = categoryVolumes[index]; 
      if (categoryVolume && Object.keys(categoryVolume).includes('marketCap')) {
        const marketCapDuration = (lastConst.marketCap / categoryVolume.marketCap - 1) * 100;
        return marketCapDuration;
      } else {
        return 0;
      } 
    }
    return 0;
  }

  static getVolume(categoryVolumes: any, time: string){ 
    let index        = categoryVolumes.length - 24;
    const lastConst  = categoryVolumes[categoryVolumes.length - 1];
    switch (time) {
      case "7d": 
        index = categoryVolumes.length - 7 * 24; 
        break;
      case "1m":
          const getDayInMonth = DateUtil.getDayInPrevMonth(); 
          index = categoryVolumes.length - getDayInMonth * 24;  
        break;
    }
 
    const categoryVolume = categoryVolumes[index]; 
    if (categoryVolume && Object.keys(categoryVolume).includes('volume24h')) {
      const marketCapDuration = (lastConst.volume24h / categoryVolume.volume24h - 1) * 100;
      return marketCapDuration;
    } else {
      return 0;
    } 
  }

  static getMarketCapChange(categoryVolumes: any, time: string): any {
    const lastMarketCap      = categoryVolumes[categoryVolumes.length - 1].marketCap; 
    let   index              = categoryVolumes.length - 24;

    switch (time) { 
      case "7d":
        index               =  categoryVolumes.length - 7 * 24;
        break;
      case "1m":
        const getDayInMonth = DateUtil.getDayInPrevMonth();
        index               =  categoryVolumes.length - getDayInMonth * 24;
        break;
    }

    let calculateConst = categoryVolumes[index]; 
    if (calculateConst && Object.keys(calculateConst).includes('marketCap')) {
      return (parseFloat(lastMarketCap) /  parseFloat(calculateConst.marketCap) - 1) * 100;
    }else {
      return 0;
    }
  }

  static getVolumeChange(categoryVolumes: any, time: string) {
    let volumnLastConst = categoryVolumes[categoryVolumes.length - 1];
    let index           = categoryVolumes[categoryVolumes.length - 24];
    switch (time) { 
      case "7d": 
        index   =  categoryVolumes.length - 7 * 24;
        break;
      case "1m":
        const getDayInMonth = DateUtil.getDayInPrevMonth();
        index   = categoryVolumes.length - getDayInMonth * 24;
        break;
    }
    const volumn24Const =  categoryVolumes[index]; 
    if (volumnLastConst && Object.keys(volumnLastConst).includes('volume24h') && 
        volumn24Const   && Object.keys(volumn24Const).includes('marketCap')) {
      const volumeChange = (volumnLastConst.volume24h / volumn24Const.marketCap - 1) * 100;
      return volumeChange;
    } else {
      return 0;
    }
  }

  static getDataChart(categoryVolumes: any, time: string) {
    const volumes = [];
    const marketCaps = [];
    const times = [];
    let index = categoryVolumes.length - 23;
    const getDayInMonth = DateUtil.getDayInPrevMonth();
    switch (time) {
      case "7d":
        index = categoryVolumes.length - 6 * 24 - 23;
        break; 
      case "1m": 
        index = categoryVolumes.length - (getDayInMonth-1) * 24 - 23;
        break;
    }
    for (
      let i = index;i < categoryVolumes.length;i++
    ) {
      const categoryVolume = categoryVolumes[i];
      try {volumes.push(parseFloat(categoryVolume.volume24h));} catch (error) {volumes.push(0);}
      try {marketCaps.push(parseFloat(categoryVolume.marketCap));} catch (error) {marketCaps.push(0);}
      try {times.push(parseFloat(categoryVolume.time));} catch (error) {times.push(0);}
    }

    return {
      volumes: volumes,
      times: marketCaps,
      marketCaps: times,
    };
  }
}

export default BusinessCategoryVolume;
