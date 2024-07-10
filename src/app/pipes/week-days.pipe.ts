import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDaysPipe'
})
export class WeekDaysPipe implements PipeTransform {

  transform(value: string ): Array<string> {
    return value?.split(",").map((day: string) => day === '0' ? "الأحد" : day === '1' ? "الإثنين" : day === '2' ? "الثلاثاء" : day === '3' ? "الأربعاء" : day === '4' ? "الخميس" : day === '5' ? "الجمعه" : "السبت");
  }
}
