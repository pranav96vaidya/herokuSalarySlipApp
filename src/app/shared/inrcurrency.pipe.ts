import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inrCurrency'
})
export class INRCurrencyPipe implements PipeTransform {
  transform(value: any, option: boolean): string {
    if (value && !isNaN(value) && option) {
      const decimalSeperatedArray = value.toString().split('.');
      let digitsAfterDecimal = decimalSeperatedArray[0].substring(decimalSeperatedArray[0].length - 3);
      const digitsBeforeDecimal = decimalSeperatedArray[0].substring(0, decimalSeperatedArray[0].length - 3);
      if (digitsBeforeDecimal != '' && digitsBeforeDecimal != '-') {
        digitsAfterDecimal = ',' + digitsAfterDecimal;
      }
      let output = digitsBeforeDecimal.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + digitsAfterDecimal;
      if (decimalSeperatedArray.length > 1) {
        output += '.' + decimalSeperatedArray[1];
      }
      return output;
      } else {
      return value;
    }
  }
}
