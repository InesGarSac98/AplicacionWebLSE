import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClassroomGame } from 'src/api/models/classroomGame';
import { ClassroomWord } from 'src/api/models/classroomWord';
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
    public dataLoaded: boolean = false;
    public userName: string;
    public studentsClassroomList: IStudentClassroomList[];
    public wordsClassroomList: IWordClassroomList[];
    public classroom: IStudentClassroomList[];
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
        console.log(this.classroomId);

        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);

        this.loadStudents();
        this.loadWords();
        this.loadGames();
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
