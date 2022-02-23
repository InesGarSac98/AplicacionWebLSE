import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { WordDetailsDialogComponent } from 'src/app/shared/dialog/word-details-dialog/word-details-dialog.component';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

    public classroomId: number;
    public wordId: number;
    public dataLoaded: boolean = false;
    public userName: string;
    public studentsClassroomList: IStudentClassroomList[];
    public wordsClassroomList: IWordClassroomList[];
    public classroom: IStudentClassroomList[];

    //list
    public items: IStudentClassroomList[] = [];
    public itemsChange = new EventEmitter<IStudentClassroomList[]>();
    public dataSourceStudents: MatTableDataSource<IStudentClassroomList>;
    public dataSourceWords: MatTableDataSource<IWordClassroomList>;
    public displayedColumnsStudents: string[];
    public displayedColumnsWords: string[];
    @ViewChild('studentsPaginator') public studentsPaginator : MatPaginator;
    @ViewChild('wordsPaginator') public wordsPaginator : MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private userService: UsersService,
        private matDialog: MatDialog,
        private wordsService: WordsService,
        private classroomService: ClassroomsService
    ) {
        this.displayedColumnsStudents = ['name','showButton'];
        this.displayedColumnsWords = ['name','showButton'];
    }

    public ngOnInit(): void{
        this.classroomId = this.route.snapshot.params['classroomId'];
        this.wordId = this.route.snapshot.params['wordId'];
        console.log(this.classroomId);

        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);

        this.loadStudents();
        this.loadWords();
    }

    public searchTextChange(searchText: string, dataSource: MatTableDataSource<any>): void {
        const filterObj = JSON.parse(dataSource.filter);

        filterObj['searchText'] = searchText;

        dataSource.filter = JSON.stringify(filterObj);
    }

    public openWord(): void {
        this.matDialog.open(
            WordDetailsDialogComponent,
            {
                data: {
                    wordName: 'patata',
                    wordVideo: 'url del video',
                    wordImage: 'url de al imagen'
                }
            }
        );
    }

    private setDataSourceSearchTextFilterPredicate(dataSource: MatTableDataSource<any>, searchPropertyName: string) {
        dataSource.filterPredicate = (data: any, filter: string) => {
            debugger;
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

    private loadWords() {
        this.classroomService.getWordsListClassroom(this.classroomId)
            .subscribe((words: ClassroomWord[]) => {
                console.log(words);
                this.wordsClassroomList = words.map(w => {
                    let result = new IWordClassroomList();
                    result.id = w.id;
                    result.wordId = w.word.id;
                    result.name = w.word.name;
                    result.image = w.word.image;
                    result.video = w.word.video;
                    result.videoDefinition = w.word.videoDefinition;
                    return result;
                });
                this.dataSourceWords = new MatTableDataSource<IWordClassroomList>(this.wordsClassroomList);
                this.dataSourceWords.paginator = this.wordsPaginator;
                this.setDataSourceSearchTextFilterPredicate(this.dataSourceWords, 'name');
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

}

export class IStudentClassroomList {
    id: number;
    name: string;
    image: string;
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
