import { Component, Input, OnInit} from '@angular/core';

interface PendingSelection {
	[ key: number ]: boolean;
}

export class SelectableItem {
    id: number;
    viewName: string;
}

@Component({
  selector: 'app-two-side-multi-select',
  templateUrl: './two-side-multi-select.component.html',
  styleUrls: ['./two-side-multi-select.component.scss']
})
export class TwoSideMultiSelectComponent implements OnInit {

	public pendingSelection: PendingSelection;
	@Input() public rightSideItems: SelectableItem[] = [];
	@Input() public leftSideItems: SelectableItem[] = [];
    filterItems = '';
    filterItems2 = '';

    public ngOnInit(): void {
		this.leftSideItems = this.leftSideItems.slice().sort(this.sortSelectableItemsOperator);

		this.pendingSelection = Object.create(null);
    }


	public addToSelectedItems( item?: SelectableItem ) : void {
		var changeItems = (item)

			? [ item ]
			: this.getPendingSelectionFromCollection(this.leftSideItems);

		this.pendingSelection = Object.create(null);

		this.leftSideItems = this.removeItemsFromCollection(this.leftSideItems, changeItems);

		this.rightSideItems = changeItems.concat(this.rightSideItems);

	}

	public removeFromSelectedItems(item?: SelectableItem) : void {
		var changeItems = (item)
			? [item]
			: this.getPendingSelectionFromCollection(this.rightSideItems);

		this.pendingSelection = Object.create( null );

		this.rightSideItems = this.removeItemsFromCollection(this.rightSideItems, changeItems);

		this.leftSideItems = changeItems
			.concat(this.leftSideItems)
			.sort(this.sortSelectableItemsOperator);
	}

	public togglePendingSelection(item: SelectableItem) : void {
		this.pendingSelection[item.id] = !this.pendingSelection[item.id];
	}

	private getPendingSelectionFromCollection(itemsCollection: SelectableItem[]) : SelectableItem[] {
		return itemsCollection.filter(
			(item) => {
				return item.id in this.pendingSelection;
			}
		);
	}

	private removeItemsFromCollection(
        itemsCollection: SelectableItem[],
        itemsToRemove: SelectableItem[]
    ) : SelectableItem[] {

		return itemsCollection.filter(
			(item) => {
				return(!itemsToRemove.includes(item));
			}
		);
	}

	private sortSelectableItemsOperator(a: SelectableItem, b: SelectableItem) : number {
		return a.viewName.localeCompare(b.viewName);
	}
}
