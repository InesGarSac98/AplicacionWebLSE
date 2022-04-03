import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { QuizzGameQuestion } from 'src/api/models/quizzGameQuestion.model';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { GameEventService } from 'src/api/services/game-event-service/game-event.service';
import { QuizzGameQuestionService } from 'src/api/services/quizz-game-question-service/quizz-game-question.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { QuizzGameEventGeneratorService } from 'src/app/services/quizz-game/quizz-game-event-generator.service';
import { GameTimerComponent } from 'src/app/shared/game-timer/game-timer.component';
import { BoardCard } from '../../memory/memory-game.component';

@Component({
    selector: 'app-quizz-game',
    templateUrl: './quizz-game.component.html',
    styleUrls: ['./quizz-game.component.scss']
})

export class QuizzGameComponent implements OnInit {

    @ViewChild(GameTimerComponent) public gameTimer: GameTimerComponent;
    @Input() public gameId: number;

    public cardQuiz: IQuiz[];
    public rotateClass: boolean = true;
    public score: number;
    public gameFinished: boolean = false;
    public isAbandoned: boolean = false;
    public isTimeOver: boolean = false;
    public maxTimeValue: number = 2*60;

    currentQuiz = 0;
    answerSelected = false;
    correctAnswers = 0;
    incorrectAnswers = 0;
    result = false;
    private availableWords: Word[];
    private availableQuestions: QuizzGameQuestion[];
    private studentId: number;
    private wordIds: number[];
    private goBackLink: string;
    private gamePlayId: number;

    private readonly MAX_QUESTIONS = 3;

    constructor(
        private userService: UsersService,
        private wordsService: WordsService,
        private classroomService: ClassroomsService,
        private studentService: StudentsService,
        private quizzGameQuestionservice: QuizzGameQuestionService,
        private gameEventService: GameEventService,
        private quizzGameEventGeneratorService: QuizzGameEventGeneratorService,
        private router: Router
    ) { }

    public ngOnInit(): void {

        this.userService.getUserLoged().subscribe((user: User) => {
            if (user.role === 'STUDENT') {
                this.goBackLink = '/students/games';
                this.getStudentQuestions();
            }
            else if (user.role === 'TEACHER') {
                this.goBackLink = '/teachers/games';
                this.getTeacherQuestions();
            }
        });
    }

    //Incrementa cuando seleccionamps la respuesta correcta
    public onAnswer(option: IAnswer) {
        this.rotateClass = false;
        this.answerSelected = true;

        if (option.correct) {
            this.correctAnswers++;
            this.score += 10;
        } else {
            this.incorrectAnswers++;
            this.score += 5;
        }

        const answerClickedEvent = this.quizzGameEventGeneratorService.generateAnswerClickedEvent(
            this.cardQuiz, this.cardQuiz[this.currentQuiz].questionId,
            option.answerId, this.gameId, this.studentId,this.score,
            this.gameTimer.getLeftTime(), this.gamePlayId);
        this.gameEventService.createGameEvent(answerClickedEvent).subscribe();

        this.gameFinished = this.checkGameFinished();

        if(!this.gameFinished){
            setTimeout(() => {
                this.currentQuiz++;
                this.answerSelected = false;
                this.rotateClass = true;
            }, 2000);
        }
    }

    public timeOver(): void {
        this.isTimeOver = true;
        this.gameFinished = this.checkGameFinished();
    }

    public goBack():void{
        this.router.navigate([this.goBackLink]);
    }

    public abandoned():void{
        this.isAbandoned = true;
        this.gameFinished = this.checkGameFinished();
    }

    public getQuizzGameQuestions() {
        this.quizzGameQuestionservice.getQuizzGameQuestionsByWordId(this.wordIds)
            .subscribe((questions: QuizzGameQuestion[]) => {
                this.availableQuestions = questions;
                this.availableQuestions.sort(() => Math.random() - 0.5);
                this.cardQuiz = [];
                for (let i = 0; i < this.MAX_QUESTIONS; i++) {
                    const element = this.availableQuestions[i];
                    this.cardQuiz.push({
                        questionId: element.id,
                        question: element.name,
                        questionImg: element.word.image,
                        isImage: element.isImage,
                        answer: element.answers.map(a => (
                            {
                                answerId: a.id,
                                option: a.isImage ? a.word.image : a.word.name,
                                correct: a.isCorrect,
                                isImage: a.isImage
                            } as IAnswer)).sort(() => Math.random() - 0.5)
                    });
                }
                this.score = 0;
                this.gameFinished = false;
                this.isTimeOver = false;
                this.isAbandoned = false;
                this.gameTimer.startTimer(this.maxTimeValue);

                const startEvent = this.quizzGameEventGeneratorService.generateStartEvent(this.cardQuiz, this.gameId, this.studentId, this.gameTimer.getLeftTime());
                this.gameEventService.createGameEvent(startEvent).subscribe(event => this.gamePlayId = event.gamePlayId);
            });
    }

    private checkGameFinished(): boolean {
        const isGameFinished = this.gameFinished || this.isTimeOver || this.isAbandoned || this.currentQuiz >= this.MAX_QUESTIONS - 1;

        if(isGameFinished){

            this.gameTimer.stopTimer();
            if (this.currentQuiz >= this.MAX_QUESTIONS - 1){
                const winEvent = this.quizzGameEventGeneratorService.generateWinEvent(
                    this.cardQuiz, this.gameId, this.studentId, this.score,
                    this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(winEvent).subscribe();
            }
            else if (this.isAbandoned){
                const abandoneEvent = this.quizzGameEventGeneratorService.generateAbandoneEvent(
                    this.cardQuiz, this.gameId, this.studentId, this.score,
                    this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(abandoneEvent).subscribe();
            }
            else {
                const loseEvent = this.quizzGameEventGeneratorService.generateLoseEvent(this.cardQuiz, this.gameId, this.studentId, this.score, this.gameTimer.getLeftTime(), this.gamePlayId);
                this.gameEventService.createGameEvent(loseEvent).subscribe();
            }
        }
        return isGameFinished;
    }

    private getTeacherQuestions() {
        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                this.availableWords = words;
                this.wordIds = words.map(word => word.id);
                this.getQuizzGameQuestions();
            });
    }

    private getStudentQuestions() {
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.studentId = student.id;
                this.classroomService.getWordsListClassroom(student.classroomId)
                    .subscribe((classroomWords: ClassroomWord[]) => {
                        this.availableWords = classroomWords
                            .map((classroomWord: ClassroomWord) => classroomWord.word);
                        this.wordIds = classroomWords.map(classroomWords => classroomWords.id);
                        this.getQuizzGameQuestions();
                    })
            });
    }
}

export class IAnswer {
    answerId: number;
    option: string;
    isImage: boolean;
    correct: boolean;
}

export class IQuiz {
    questionId: number;
    question: string;
    questionImg: string;
    isImage: boolean;
    answer: IAnswer[];
}
