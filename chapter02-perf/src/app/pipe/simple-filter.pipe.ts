import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFilter'
})
export class SimpleFilterPipe implements PipeTransform {

  transform(value: any[], phrase: string): unknown {
    if (!value || !phrase) {
      return value;
    }

    return value.filter( item => ('' + item.first_name).includes(phrase) );
  }

}
