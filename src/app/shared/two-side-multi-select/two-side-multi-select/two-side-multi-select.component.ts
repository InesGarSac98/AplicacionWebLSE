import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';

interface PendingSelection {
	[ key: number ]: boolean;
}

export class SelectableItem {
    id: number;
    viewName: string;
    isChecked: boolean;
}

@Component({
  selector: 'app-two-side-multi-select',
  templateUrl: './two-side-multi-select.component.html',
  styleUrls: ['./two-side-multi-select.component.scss']
})
export class TwoSideMultiSelectComponent implements OnInit, AfterViewInit {

	public pendingSelection: PendingSelection;
    public radioButtonFilter: string = 'filterAll';
	@Input() public items: SelectableItem[] = [];
    @Output() public itemsChange = new EventEmitter<SelectableItem[]>();
    public filterItems = '';
    public displayedColumns: string[];
    @Input() public dataSource: MatTableDataSource<SelectableItem>;
    @Output() public showItemButtonClicked = new EventEmitter<number>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
        this.displayedColumns = ['isChecked','viewName','showButton'];
    }

    public ngOnInit(): void {
		this.items = this.items.slice().sort(this.sortSelectableItemsOperator);
        this.dataSource = new MatTableDataSource<SelectableItem>(this.items);

		this.pendingSelection = Object.create(null);
    }

    public ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data: SelectableItem, filter:string) => {
            const filterObj = JSON.parse(filter);

            switch(filterObj.filterCheckedState){
                case "filterAll":
                    break;
                case "filterSelected":
                    if(!data.isChecked) return false;
                    break;
                case "filterUnselected":
                    if(data.isChecked) return false;
                    break;
            }

            if (filterObj.searchText?.length === 0 || data.viewName.toLowerCase().indexOf(filterObj.searchText.toLowerCase()) > -1) {
                return true;
            };
            return false;
        };
        this.dataSource.filter = JSON.stringify({
            filterCheckedState: 'filterAll',
            searchText: ''
        });
    }

    public radioButtonFilterChange(event: MatRadioChange): void {
        const filterObj = JSON.parse(this.dataSource.filter);

        filterObj['filterCheckedState'] = event.value;

        this.dataSource.filter = JSON.stringify(filterObj);
    }

    public searchTextChange(searchText: string): void {
        const filterObj = JSON.parse(this.dataSource.filter);

        filterObj['searchText'] = searchText;

        this.dataSource.filter = JSON.stringify(filterObj);
    }

	public changeSelectionItems(event: MatCheckboxChange, item: SelectableItem) : void {
        let foundItem = this.items.find(x => x.id === item.id);

        if (!foundItem) return;

        foundItem.isChecked = event.checked;
	}

	private sortSelectableItemsOperator(a: SelectableItem, b: SelectableItem) : number {
		return a.viewName.localeCompare(b.viewName);
	}
}
