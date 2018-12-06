import { DateAdapter, MatDateFormats } from '@angular/material';
import { isMoment, Moment } from 'moment';
import * as moment from 'moment';

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y'
  }
};

const dateNames: string[] = [];
for (let date = 1; date <= 31; date++) {
  dateNames.push(String(date));
}

export class MomentDateAdapter extends DateAdapter<Moment> {

  private localeData = moment.localeData();

  getYear(date: Moment): number {
    return date.year();
  }
  invalid(): Moment {
    throw new Error('Method not implemented.');
  }

  getMonth(date: Moment): number {
    return date.month();
  }

  getDate(date: Moment): number {
    return date.date();
  }

  getDayOfWeek(date: Moment): number {
    return date.day();
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this.localeData.months();
      case 'short':
        return this.localeData.monthsShort();
      case 'narrow':
        return this.localeData.monthsShort().map(month => month[0]);
    }
  }

  getDateNames(): string[] {
    return dateNames;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return this.localeData.weekdays();
      case 'short':
        return this.localeData.weekdaysShort();
      case 'narrow':
        return this.localeData.weekdaysShort();
    }
  }

  getYearName(date: Moment): string {
    return String(date.year());
  }

  getFirstDayOfWeek(): number {
    return this.localeData.firstDayOfWeek();
  }

  getNumDaysInMonth(date: Moment): number {
    return date.daysInMonth();
  }

  clone(date: Moment): Moment {
    return date.clone();
  }

  createDate(year: number, month: number, date: number): Moment {
    return moment([year, month, date]);
  }

  today(): Moment {
    return moment();
  }

  parse(value: any, parseFormat: any): Moment {
    return moment(value, parseFormat);
  }

  format(date: Moment, displayFormat: any): string {
    if (date) {
      return date.format(displayFormat);
    }
    return '';
  }

  addCalendarYears(date: Moment, years: number): Moment {
    return date.clone().add(years, 'y');
  }

  addCalendarMonths(date: Moment, months: number): Moment {
    return date.clone().add(months, 'M');
  }

  addCalendarDays(date: Moment, days: number): Moment {
    return date.clone().add(days, 'd');
  }

  setLocale(locale: any): void {
    this.localeData = moment.localeData(locale);
  }

  compareDate(first: Moment, second: Moment): number {
    return first.diff(second, 'seconds', true);
  }

  sameDate(first: any | Moment, second: any | Moment): boolean {
    if (first == null) {
      return second == null;
    } else if (isMoment(first)) {
      return first.isSame(second);
    }
    return super.sameDate(first, second);
  }

  clampDate(date: Moment, min?: any | Moment, max?: any | Moment): Moment {
    if (min && date.isBefore(min)) {
      return min;
    } else if (max && date.isAfter(max)) {
      return max;
    }
    return date;
  }

  isValid(date: Moment): boolean {
    return date.isValid();
  }

  isDateInstance(obj: Object): boolean {
    return moment.isMoment(obj);
  }

  toIso8601(date: Moment): string {
    return date.format();
  }

  fromIso8601(iso8601String: string): Moment {
    return moment(iso8601String);
  }

}
