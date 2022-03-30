import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from 'src/app/shared/dialog/dialogs/dialogs.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
    constructor(public dialog: MatDialog){}

    public openDialog(): void{
        let dialogRef = this.dialog.open(DialogsComponent);

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }
}
