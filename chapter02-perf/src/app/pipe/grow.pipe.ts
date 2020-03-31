import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

const grow = (base: number, interest: number, years: number): number => {
  base *= 1 + interest;
  years--;
  if (years) {
      return grow(base, interest, years);
  }
  return Math.round(base * 100) / 100;
};

@Pipe({
  name: 'grow'
})
export class GrowPipe implements PipeTransform {

  @memo(args => JSON.stringify(args))
  transform(base: any): unknown {
    if (!base) {
      return base;
    }

    console.log('Calculate: ', base);
    return grow(base.base, base.interest, base.years);
  }

}
