import { format } from 'date-fns';

export class DateUtil {

  public static checkDateIsInWeek(nextUnlockDate: any, dayNumber: number) {
    const today = new Date();
    today.setDate(today.getDate() + dayNumber);
    const isSameWeek = today.getFullYear() === nextUnlockDate.getFullYear() &&
                   today.getMonth() === nextUnlockDate.getMonth() &&
                   today.getDate() - today.getDay() === nextUnlockDate.getDate() - nextUnlockDate.getDay();
    return isSameWeek;
  }

  public static getDateMaxMin(vesting: any) {
    let lastDate = vesting.allocations[0].batches[0].date || null;
    let firstDate = vesting.allocations[0].batches[0].date || null;
    if (!firstDate) {
      return { firstDate: null, lastDate: null };
    }
    vesting.allocations.forEach((allocation: any) => {
      allocation.batches.forEach((batch: any) => {
        const batchDate = new Date(batch.date);
        const fDate = new Date(firstDate);
        const lDate = new Date(lastDate);

        if (batchDate < fDate) {
          firstDate = batchDate;
        }
        if (batchDate > lDate) {
          lastDate = batchDate;
        }
      });
    });
    return { firstDate, lastDate };
  }

  public static format(dateStr: string) {
    const formattedDate = new Date(dateStr).toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  }

  public static getDayInPrevMonth() {
    var dayNow = new Date();
    dayNow.setDate(1);
    dayNow.setDate(dayNow.getDate() - 1);
    var dayNumber = dayNow.getDate();

    return dayNumber;
  }

  public static formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return format(date, 'dd/MM/yyyy');
  }

  public static getCurrentDate(monthMinus: number, dayMinus: number) {
    const currentDate = new Date();
    if (monthMinus !== 0) {
      currentDate.setMonth(currentDate.getMonth() - monthMinus);
    }
    if (dayMinus !== 0) {
      currentDate.setDate(currentDate.getDate() - dayMinus);
    }
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  static compareTwoDate(firstDate: any, secondDate: any): any {
    const fDate = new Date(firstDate);
    const sDate = new Date(secondDate);
    if (fDate == sDate) {
      return 3;
    } else if (fDate > sDate) {
      return 1;
    } else if(fDate < sDate){
      return 2;
    }
  }

  static getCurrentWeekDates() {
    const currentDate = new Date();
    let currentDay = currentDate.getDay();
    currentDay = currentDay === 0 ? 6 : currentDay - 1;

    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);

    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDay));

    const firstDay = firstDayOfWeek.getDate();
    const lastDay = lastDayOfWeek.getDate();

    return {
      firstDay,
      lastDay,
    };
  }

  static getYesterdayDate() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var formattedYesterdayDate = yesterday.toISOString().split('T')[0];

    return formattedYesterdayDate;
  }
}
