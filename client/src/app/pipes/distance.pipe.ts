import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return Math.ceil(value/1000) + ' km entfernt';
  }
}
