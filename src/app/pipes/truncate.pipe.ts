import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform {

  transform(str: string, ...args: unknown[]): unknown {
    let num = 60;
    if (str.length > num) return str.slice(0, num) + "...";
    else return str;
    
  }

}
6