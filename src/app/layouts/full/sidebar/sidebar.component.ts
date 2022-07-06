import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { UsersService } from 'src/api/services/users-service/users.service';
import { User } from 'src/api/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from 'src/app/shared/dialog/dialogs/dialogs.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public userName: string;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private userService: UsersService,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public ngOnInit(): void {
    this.userService.getUserLoged()
        .subscribe((user: User) => {
            this.userName = user.name;
            this.menuItems.setUserLoggedRole(user.role);
        });
    }
    public openDialog(): void{
        let dialogRef = this.dialog.open(DialogsComponent);

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }
}
