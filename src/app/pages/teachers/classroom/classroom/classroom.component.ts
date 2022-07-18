import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/api/models/classroom.model';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Word } from 'src/api/models/word.model';
import { DialogTemplateComponent } from 'src/app/shared/dialog/dialog-template/dialog-template.component';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

    public classroomId: number;
    public wordId: number;
    public initialTab: number;
    public dataLoaded: boolean = false;
    public userName: string;
    private fullWordsList: Word[];
    public wordToShowDetails: Word;
    public studentsClassroomList: IStudentClassroomList[];
    public wordsClassroomList: IWordClassroomList[];
    public classroom: IClassroom;
    public gamesClassroomList: IGameClassroomList[];

    //list
    public dataSourceStudents: MatTableDataSource<IStudentClassroomList>;
    public dataSourceWords: MatTableDataSource<IWordClassroomList>;
    public dataSourceGames: MatTableDataSource<IGameClassroomList>;
    public displayedColumnsStudents: string[];
    public displayedColumnsWords: string[];
    public displayedColumnsGames: string[];
    @ViewChild('studentsPaginator') public studentsPaginator : MatPaginator;
    @ViewChild('wordsPaginator') public wordsPaginator : MatPaginator;
    @ViewChild('gamesPaginator') public gamesPaginator : MatPaginator;
    @ViewChild('wordDetailsDialogTemplate') public wordDetailsDialogTemplate: TemplateRef<any>;

    constructor(
        private route: ActivatedRoute,
        private userService: UsersService,
        private matDialog: MatDialog,
        private classroomService: ClassroomsService,
        private clipboard: Clipboard,
        private router: Router,
        public dialog: MatDialog,
    ) {
        this.displayedColumnsStudents = ['name','showButton'];
        this.displayedColumnsWords = ['name','showButton'];
        this.displayedColumnsGames = ['image','name','showButton'];
    }

    public ngOnInit(): void{
        this.classroomId = this.route.snapshot.params['classroomId'];

        let tabQueryParam = this.route.snapshot.queryParams['tab'];
        this.initialTab = (tabQueryParam === null || tabQueryParam === undefined) ?
            this.initialTab = 0 :
            this.initialTab = parseInt(tabQueryParam);

        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);

        this.loadClassroom();
        this.loadStudents();
    }

    public searchTextChange(searchText: string, dataSource: MatTableDataSource<any>): void {
        const filterObj = JSON.parse(dataSource.filter);

        filterObj['searchText'] = searchText;

        dataSource.filter = JSON.stringify(filterObj);
    }

    public showStudentButtonClicked(studentId: number): void {
        this.router.navigate(['teachers/classrooms/' + this.classroomId + '/student-statistics', studentId]);
    }

    public showWordButtonClicked(id: number): void {
        const word = this.fullWordsList.find(x => x.id === id);

        if (!word) return;

        this.wordToShowDetails = word;

        this.dialog.open(
            DialogTemplateComponent,
            {
                data: {
                    template: this.wordDetailsDialogTemplate,
                    dialogButtons: [],
                    dialogTitle: word.name
                }
            }
        );
    }

    private setDataSourceSearchTextFilterPredicate(dataSource: MatTableDataSource<any>, searchPropertyName: string) {
        dataSource.filterPredicate = (data: any, filter: string) => {
            const filterObj = JSON.parse(filter);

            if (filterObj.searchText?.length === 0 || data[searchPropertyName].toLowerCase().indexOf(filterObj.searchText.toLowerCase()) > -1) {
                return true;
            };
            return false;
        };
        dataSource.filter = JSON.stringify({
            searchText: ''
        });
    }

    private loadClassroom() {
        this.classroomService.getClassroom(this.classroomId)
            .subscribe((classroom: Classroom) => {
                this.classroom = new IClassroom();
                this.classroom.id = classroom.id;
                this.classroom.name = classroom.name;
                this.classroom.code = classroom.classroomCode;
                this.dataLoaded = true;
            });
    }

    private loadStudents() {
        this.classroomService.getStudentsListClassroom(this.classroomId)
            .subscribe((students: Student[]) => {
                this.studentsClassroomList = students.map(s => {
                    let result = new IStudentClassroomList();
                    result.id = s.id;
                    result.name = s.user.name;
                    result.image = "./assets/images/games/memory.png";
                    return result;
                });
                this.dataSourceStudents = new MatTableDataSource<IStudentClassroomList>(this.studentsClassroomList);
                this.dataSourceStudents.paginator = this.studentsPaginator;
                this.setDataSourceSearchTextFilterPredicate(this.dataSourceStudents, 'name');
            });
    }

    public copyToClipboard() {
        this.clipboard.copy(this.classroom.code);
    }

    public goBackClicked(){
        this.router.navigate(['teachers/classrooms']);
    }
}

export class IStudentClassroomList {
    id: number;
    name: string;
    image: string;
}

class IClassroom {
    id: number;
    name: string;
    code: string;
}

export class IWordList {
    id: number;
    name: string;
    image: string;
}

export class IWordClassroomList {
    id: number;
    wordId: number;
    name: string;
    image: string;
    video: string;
    videoDefinition: string;
}

export class IGameClassroomList {
    id: number;
    gameId: number;
    name: string;
    image: string;
}
