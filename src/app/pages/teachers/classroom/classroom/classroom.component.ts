import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Classroom } from 'src/api/models/classroom.model';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Game } from 'src/api/models/game.model';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { GameDetailDialogComponent } from 'src/app/shared/dialog/game-detail-dialog/game-detail-dialog.component';
import { WordDetailsDialogComponent } from 'src/app/shared/dialog/word-details-dialog/word-details-dialog.component';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService,
        private matDialog: MatDialog,
        private classroomService: ClassroomsService
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
        this.loadWords();
        //this.loadGames();
    }

    public searchTextChange(searchText: string, dataSource: MatTableDataSource<any>): void {
        const filterObj = JSON.parse(dataSource.filter);

        filterObj['searchText'] = searchText;

        dataSource.filter = JSON.stringify(filterObj);
    }

    public showWordButtonClicked(id: number): void {
        this.matDialog.open(
            WordDetailsDialogComponent,
            {
                data: {
                    word: this.wordsClassroomList.find(x => x.id === id)
                }
            }
        );
    }

    public showGameButtonClicked(id: number): void {
        let dialogRef = this.matDialog.open(
            GameDetailDialogComponent,
            {
                data: {
                    game: this.gamesClassroomList.find(x => x.id === id)
                }
            }
        );

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });
    }

    public showStudentButtonClicked(id: number): void {
        /*let dialogRef = this.matDialog.open(
            GameDetailDialogComponent,
            {
                data: {
                    game: this.fullGamesList.find(x => x.id === id)
                }
            }
        );

        dialogRef.afterClosed().subscribe(result =>{
            console.log('The dialog was closed')
        });*/
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

    private loadGames() {
        this.classroomService.getGamesListClassroom(this.classroomId)
            .subscribe((games: ClassroomGame[]) => {
                this.gamesClassroomList = games.map(g => {
                    let result = new IGameClassroomList();
                    result.id = g.id;
                    result.gameId = g.gameId;
                    result.name = g.game.name;
                    result.image = g.game.image;
                    return result;
                });
                this.dataSourceGames = new MatTableDataSource<IGameClassroomList>(this.gamesClassroomList);
                this.dataSourceGames.paginator = this.gamesPaginator;
                this.setDataSourceSearchTextFilterPredicate(this.dataSourceGames, 'name');
            });
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
