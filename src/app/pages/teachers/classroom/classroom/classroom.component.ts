import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { GamesService } from 'src/api/services/games-service/games.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { WordDetailsDialogComponent } from 'src/app/shared/dialog/word-details-dialog/word-details-dialog.component';
import { SelectableItem } from 'src/app/shared/two-side-multi-select/two-side-multi-select/two-side-multi-select.component';

@Component({
    selector: 'app-classroom',
    templateUrl: './classroom.component.html',
    styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

    public classroomId: number;
    public wordId: number;
    public userName: string;
    public studentsClassroomList: IStudentClassroomList[];
    public wordsClassroomList: IWordClassroomList[];
    @Input() classroom: IStudentClassroomList[];

    constructor(
        private route: ActivatedRoute,
        private userService: UsersService,
        private matDialog: MatDialog,
        private wordsService: WordsService,
        private classroomService: ClassroomsService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.classroomId = this.route.snapshot.params['classroomId'];
        this.wordId = this.route.snapshot.params['wordId'];
        console.log(this.classroomId);

        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);

        this.classroomService.getStudentsListClassroom(this.classroomId)
            .subscribe((students: Student[]) => {
                console.log(students);
                this.studentsClassroomList = students.map(s => {
                    let result = new IStudentClassroomList();
                    result.id = s.id;
                    result.name = s.user.name;
                    result.image = "./assets/images/games/memory.png";
                    return result;
                });
            });

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
            });
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
