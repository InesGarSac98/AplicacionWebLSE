import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterViewName'
})
export class FilterViewNamePipe implements PipeTransform {

    transform(value: any, arg: any): any {
        const resultSearch = [];

        for (const item of value) {
          if (item.viewName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultSearch.push(item);
          };
        };
        return resultSearch;
    }

}
