import { Pipe, PipeTransform } from '@angular/core';
import { ColorConstants } from '../constants/color-constants';

@Pipe({
  name: 'carColor'
})
export class CarColorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return ColorConstants[value];
  }

}
