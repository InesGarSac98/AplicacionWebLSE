import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
    public userName: string;
    public studentsClassroomList: IStudentClassroomList[];
    public wordList: IWordList[];
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
        console.log(this.classroomId);

        this.userService.getUserLoged()
            .subscribe((user: User) => this.userName = user.name);

        this.classroomService.getStudentsListClassroom(this.classroomId)
        .subscribe((students: Student[])=>{
            console.log(students);
            this.studentsClassroomList = students.map(s => {
                let result = new IStudentClassroomList();
                result.id = s.id;
                result.name = s.user.name;
                result.image = "./assets/images/games/memory.png";
                return result;
            });
        });

        let aaa = (await this.wordsService.getWord('patata').toPromise()).imageUrl;
        let bbb = (await this.wordsService.getWord('tomate').toPromise()).imageUrl;
        this.wordList = [
            {id:1,name:"Patata",image:aaa},
            {id:2, name:"Tomate",image:bbb}
        ];

    }

    public openWord(): void{
        this.matDialog.open(
            WordDetailsDialogComponent,
            {
                data: {
                    wordName: 'true',
                    wordVideo: 'creditAgainstEstateSelected',
                    wordImage: 'this.proceedingId'
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
