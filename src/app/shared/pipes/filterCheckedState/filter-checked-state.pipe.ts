import { Pipe, PipeTransform } from '@angular/core';
import { SelectableItem } from '../../two-side-multi-select/two-side-multi-select/two-side-multi-select.component';

@Pipe({
  name: 'filterCheckedState'
})
export class FilterCheckedStatePipe implements PipeTransform {

    transform(value: SelectableItem[], arg: string): any {
        const resultSearch = [];

        switch(arg){
            case "filterAll":
                resultSearch.push(...value);
                break;
            case "filterSelected":
                resultSearch.push(...value.filter(x => x.isChecked));
                break;
            case "filterUnselected":
                resultSearch.push(...value.filter(x => !x.isChecked));
                break;
        }

        return resultSearch;
    }

}
