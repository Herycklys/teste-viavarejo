import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatter'
})
export class FormatterPipe implements PipeTransform {

  transform(value: string, format: string, replace: string): string {

    return value.replace(new RegExp(format), replace);
  }

}
