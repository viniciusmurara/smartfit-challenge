import { Injectable } from '@angular/core';
import Location from '../types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type Hour = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sab.';
      default:
        return 'Seg. à Sex.';
    }
  }

  filterUnits(unit: Location, openHour: string, closeHour: string): boolean {
    if (!unit.schedules) return true

    let openHourFilter = parseInt(openHour, 10);
    let closeHourFilter = parseInt(closeHour, 10);

    let todaysWeekday = this.transformWeekday(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let scheduleHour = unit.schedules[i].hour;
      let scheduleWeekday = unit.schedules[i].weekdays;

      if (todaysWeekday === scheduleWeekday) {
        if (scheduleHour !== 'Fechada') {
          let [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ');
          let unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10);
          let unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10);

          if (unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter) return true;
        }
      }
    }
    return false
  }

  filter(results: Location[], showClosed: boolean, hour: string) {
    let intermidiateResults = results;

    if (!showClosed) {
      intermidiateResults = results.filter(location => location.opened === true);
    }

    if (hour) {
      const openHour = OPENING_HOURS[hour as Hour].first
      const closeHour = OPENING_HOURS[hour as Hour].last
      return intermidiateResults.filter(location => this.filterUnits(location, openHour, closeHour));
    } else {
      return intermidiateResults;
    }
  }
}
