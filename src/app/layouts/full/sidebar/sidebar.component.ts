import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { UsersService } from 'src/api/services/users-service/users.service';
import { User } from 'src/api/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from 'src/app/shared/dialog/dialogs/dialogs.component';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { Student } from 'src/api/models/student.model';
import { Classroom } from 'src/api/models/classroom.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  public userName: string;
  public student: Student;
  public classroom: Classroom;
  public userClassroom: number;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private userService: UsersService,
    private studentService: StudentsService,
    private classroomService: ClassroomsService,
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
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.student = student;
                this.classroomService.getClassroom(student.classroomId)
                    .subscribe((classroom: Classroom) => this.classroom = classroom);
                    this.userClassroom = student.classroomId;
        });


    }
    public openDialog(): void{
        let dialogRef = this.dialog.open(DialogsComponent);

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }
}
