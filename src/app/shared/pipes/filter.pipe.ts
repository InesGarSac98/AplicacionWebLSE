import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, arg: any): any {
        if (arg === '' || arg.length < 3) return value;
        const resultSearch = [];

        for (const item of value) {
          if (item.viewName.indexOf(arg) > -1) {
            resultSearch.push(item);
          };
        };
        return resultSearch;
    }

}
