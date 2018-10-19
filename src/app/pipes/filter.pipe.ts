import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(elements: any[], filterValue?: string): any[] {
    filterValue = filterValue && filterValue.trim();

    if (!filterValue) return elements;

    const rgx = new RegExp(filterValue, 'i');

    return elements.filter(
      element => Object.keys(element).some(key => rgx.test(element[key]))
    );
  }

}
