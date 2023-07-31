import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inr'
})

export class InrPipe implements PipeTransform {

  transform(val: Number, ...args: unknown[]): unknown {
    let newPrice = val.toLocaleString("en-IN", {style:"currency", currency:"INR", minimumFractionDigits: 0, maximumFractionDigits: 0});
    return newPrice;
  }

}
