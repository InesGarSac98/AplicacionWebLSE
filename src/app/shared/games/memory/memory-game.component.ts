import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Student } from 'src/api/models/student.model';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { User } from 'src/api/models/user.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { GameEventService } from 'src/api/services/game-event-service/game-event.service';
import { StudentLearnedWordsService } from 'src/api/services/student-learned-words-service/student-learned-words.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { MemoryGameEventGeneratorService } from 'src/app/services/memory-game/memory-game-event-generator.service';
import { GameTimerComponent } from '../../game-timer/game-timer.component';

@Component({
    selector: 'app-memory-game',
    templateUrl: './memory-game.component.html',
    styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

    @ViewChild(GameTimerComponent) public gameTimer: GameTimerComponent;

    @Input() public gameId: number;
    public boardCards: BoardCard[];
    public maxTimeValue: number = 2*60;
    public gameFinished: boolean = false;
    public isAbandoned: boolean = false;
    public score: number;
    public numPairsAchieved: number;
    public maxPairs: number = 6;
    public classroomId: number;

    private selecciones: BoardCard[];
    private pairsAchieved: BoardCard[];
    private availableWords: Word[];
    private studentId: number;
    private isTimeOver: boolean;
    private goBackLink: string;
    private gamePlayId: number;

    constructor(
        private sanitizer: DomSanitizer,
        private wordsService: WordsService,
        private userService: UsersService,
        private classroomService: ClassroomsService,
        private studentService: StudentsService,
        private memoryGameEventGeneratorService: MemoryGameEventGeneratorService,
        private gameEventService: GameEventService,
        private studentLearnedWordsService: StudentLearnedWordsService,
        private router: Router,
        private route: ActivatedRoute
        ) { }

    public ngOnInit(): void {
        this.selecciones = [];

        //this.generateBoard();

        this.userService.getUserLoged().subscribe((user: User) => {
            if (user.role === 'STUDENT') {
                this.goBackLink = '/students/games';
                this.getStudentWords();
            }
            else if (user.role === 'TEACHER') {
                this.classroomId = this.route.snapshot.params['classroomId'];
                this.goBackLink = '/teachers/classrooms/' + this.classroomId;
                this.getTeacherWords();
            }
        });
    }

    public async generateBoard(): Promise<void> {
        this.selecciones = [];
        this.pairsAchieved = [];
        this.score = 0;
        this.numPairsAchieved = 0;
        this.gameFinished = false;
        this.isAbandoned = false;
        this.isTimeOver = false;
        let board = document.getElementById("board");

        this.availableWords.sort(() => Math.random() - 0.5);

        if (board !== null && board !== undefined) {
            this.boardCards = [];
            for (let i = 0; i < this.maxPairs; i++) {
                this.boardCards.push({
                    content: this.availableWords[i].name,
                    contentType: "text",
                    wordId: this.availableWords[i].id
                } as BoardCard);
                this.boardCards.push({
                    content: this.availableWords[i].image,
                    contentType: "img",
                    wordId: this.availableWords[i].id
                } as BoardCard);
            }
            this.boardCards.sort(() => Math.random() - 0.5); //Para que las tarjetas aparezcan de manera aleatoria
        }

        this.gameTimer.startTimer(this.maxTimeValue);

        const startEvent = this.memoryGameEventGeneratorService.generateStartEvent(this.boardCards, this.gameId, this.studentId, this.gameTimer.getLeftTime());
        this.gameEventService.createGameEvent(startEvent).subscribe(event => this.gamePlayId = event.gamePlayId);
    }

    public selectBoardCard(boardCardHtmlElement: HTMLElement, boardCard: BoardCard): void {
        if (this.gameFinished || this.selecciones.length == 2) return;

        if (boardCardHtmlElement.style.transform != "rotateY(180deg)") {
            boardCardHtmlElement.style.transform = "rotateY(180deg)";
            this.selecciones.push(boardCard);
            const cardClickedEvent = this.memoryGameEventGeneratorService
                .generateCardClickedEvent(this.boardCards, this.pairsAchieved, this.selecciones, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
            this.gameEventService.createGameEvent(cardClickedEvent).subscribe();
        }

        if (this.selecciones.length == 2) {
            this.unselect();
        }
    }

    public timeOver(): void {
        this.isTimeOver = true;
        this.gameFinished = this.checkWin();
    }

    public goBack():void{
        this.router.navigate([this.goBackLink]);
    }

    public abandoned():void{
        this.isAbandoned = true;
        this.gameFinished = this.checkWin();
    }

    private unselect(): void {
        const primeraSeleccionada = this.selecciones[0];
        const segundaSeleccionada = this.selecciones[1];
        setTimeout(() => {
            let trasera1 = document
                .getElementById("trasera" + primeraSeleccionada.contentType + primeraSeleccionada.wordId);
            let trasera2 = document
                .getElementById("trasera" + segundaSeleccionada.contentType + segundaSeleccionada.wordId);

            let tarjeta1 = document
                .getElementById("boardCard" + primeraSeleccionada.contentType + primeraSeleccionada.wordId);
            let tarjeta2 = document
                .getElementById("boardCard" + segundaSeleccionada.contentType + segundaSeleccionada.wordId);

            if (trasera1 !== null && trasera1 !== undefined &&
                trasera2 !== null && trasera2 !== undefined &&
                tarjeta1 !== null && tarjeta1 !== undefined &&
                tarjeta2 !== null && tarjeta2 !== undefined)
            {
                //Si no coinciden
                if (primeraSeleccionada.wordId != segundaSeleccionada.wordId) {
                    tarjeta1.style.transform = "rotateY(0deg)";
                    tarjeta2.style.transform = "rotateY(0deg)";

                    const pairFailEvent = this.memoryGameEventGeneratorService.generatePairFailEvent(this.boardCards, this.pairsAchieved, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
                    this.gameEventService.createGameEvent(pairFailEvent).subscribe();

                } else { //Si coincide cambio color
                    trasera1.style.background = "green";
                    trasera2.style.background = "green";
                    this.pairsAchieved.push(primeraSeleccionada);
                    this.pairsAchieved.push(segundaSeleccionada);
                    this.numPairsAchieved++;

                    this.score += 10;

                    const pairSuccessEvent = this.memoryGameEventGeneratorService.generatePairSuccessEvent(this.boardCards, this.pairsAchieved, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
                    this.gameEventService.createGameEvent(pairSuccessEvent).subscribe();
                    this.gameFinished = this.checkWin();
                }
            }
            this.selecciones = [];
        }, 1000);
    }

    private checkWin(): boolean {
        const isGameFinished = this.gameFinished || this.numPairsAchieved === this.maxPairs || this.isTimeOver || this.isAbandoned;

        if(isGameFinished){

            this.gameTimer.stopTimer();
            if (this.numPairsAchieved === this.maxPairs){
                const winEvent = this.memoryGameEventGeneratorService.generateWinEvent(this.boardCards, this.pairsAchieved, this.selecciones, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(winEvent).subscribe();
            }
            else if (this.isAbandoned){
                const abandoneEvent = this.memoryGameEventGeneratorService.generateAbandoneEvent(this.boardCards,this.pairsAchieved, this.selecciones, this.gameId, this.studentId, this.score,this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(abandoneEvent).subscribe();
            }
            else {
                const loseEvent = this.memoryGameEventGeneratorService.generateLoseEvent(this.boardCards, this.pairsAchieved, this.selecciones, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(loseEvent).subscribe();
            }

            this.pairsAchieved.forEach(p => {
                const studentLearnedWord = {
                    date: new Date(),
                    gameId: this.gameId,
                    studentId: this.studentId,
                    wordId: p.wordId
                } as StudentLearnedWord;
                this.studentLearnedWordsService.saveStudentLearnedWords(studentLearnedWord).subscribe();
            });

        }
        return isGameFinished;
    }

    private getTeacherWords() {
        this.wordsService.getWordsList()
            .subscribe(async (words: Word[]) => {
                this.availableWords = words;
                await this.generateBoard();
            });
    }

    private getStudentWords() {
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.studentId = student.id;
                this.classroomService.getWordsListClassroom(student.classroomId)
                    .subscribe(async (classroomWords: ClassroomWord[]) => {
                        this.availableWords = classroomWords
                            .map((classroomWord: ClassroomWord) => classroomWord.word);
                        await this.generateBoard();
                    })
                });
    }
}

export class BoardCard {
    contentType: string;
    content: string;
    wordId: number;
}
