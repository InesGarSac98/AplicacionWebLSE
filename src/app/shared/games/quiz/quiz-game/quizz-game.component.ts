import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzGameClassroomConfiguration } from 'src/api/models/quizzGameClassroomConfiguration.model';
import { QuizzGameQuestion } from 'src/api/models/quizzGameQuestion.model';
import { Student } from 'src/api/models/student.model';
import { StudentLearnedWord } from 'src/api/models/studentLearnedWords.model';
import { User } from 'src/api/models/user.model';
import { GameEventService } from 'src/api/services/game-event-service/game-event.service';
import { QuizzGameClassroomConfigurationService } from 'src/api/services/quizz-game-classroom-configuration-service/quizz-game-classroom-configuration.service';
import { StudentLearnedWordsService } from 'src/api/services/student-learned-words-service/student-learned-words.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { QuizzGameEventGeneratorService } from 'src/app/services/quizz-game/quizz-game-event-generator.service';
import { GameTimerComponent } from 'src/app/shared/game-timer/game-timer.component';

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
    public score: number = 0;
    public gameFinished: boolean = false;
    public isAbandoned: boolean = false;
    public isTimeOver: boolean = false;
    public isWin: boolean = false;
    public currentConfigurationId: number;
    public currentConfiguration: QuizzGameClassroomConfiguration;
    public currentQuestions: QuizzGameQuestion[];
    public classroomId: number;

    currentQuiz = 0;
    answerSelected = false;
    correctAnswers = 0;
    incorrectAnswers = 0;
    result = false;
    private availableQuestions: QuizzGameQuestion[];
    private studentId: number;
    private goBackLink: string;
    private gamePlayId: number;
    private MAX_QUESTIONS: number;
    private user: User;

    constructor(
        private route: ActivatedRoute,
        private userService: UsersService,
        private studentService: StudentsService,
        private gameEventService: GameEventService,
        private quizzGameEventGeneratorService: QuizzGameEventGeneratorService,
        private studentLearnedWordsService: StudentLearnedWordsService,
        private quizzGameClassroomConfigurationService: QuizzGameClassroomConfigurationService,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.userService.getUserLoged().subscribe((user: User) => {
            this.user = user;
            if (user.role === 'STUDENT') {
                this.goBackLink = '/students/games';
                this.getStudentQuestions();
            }
            else if (user.role === 'TEACHER') {
                this.classroomId = this.route.snapshot.params['classroomId'];
                this.goBackLink = '/teachers/classrooms/' + this.classroomId;
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

            const wordId = this.availableQuestions
                .find(q => q.id === this.cardQuiz[this.currentQuiz].questionId)
                ?.answers.find(a => a.id === option.answerId)
                ?.wordId;

            const studentLearnedWord = {
                date: new Date(),
                gameId: this.gameId,
                studentId: this.studentId,
                wordId: wordId
            } as StudentLearnedWord;
            if (this.user.role === 'STUDENT') {
                this.studentLearnedWordsService.saveStudentLearnedWords(studentLearnedWord).subscribe();
            }
        } else {
            this.incorrectAnswers++;
            this.score += 5;
        }

        if (this.user.role === 'STUDENT') {
            const answerClickedEvent = this.quizzGameEventGeneratorService.generateAnswerClickedEvent(
                this.cardQuiz, this.cardQuiz[this.currentQuiz].questionId,
                option.answerId, this.gameId, this.studentId,this.score,
                this.gameTimer.getLeftTime(), this.gamePlayId);
            this.gameEventService.createGameEvent(answerClickedEvent).subscribe();
        }

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

    private checkGameFinished(): boolean {
        const isGameFinished = this.gameFinished || this.isTimeOver || this.isAbandoned || this.currentQuiz >= this.MAX_QUESTIONS - 1;

        if(isGameFinished){
            if (this.currentQuiz >= this.MAX_QUESTIONS - 1 && this.correctAnswers > this.MAX_QUESTIONS / 2){
                this.isWin = true;
            }
            this.gameTimer.stopTimer();
            if (this.user.role === 'STUDENT') {
                if (this.currentQuiz >= this.MAX_QUESTIONS - 1 && this.correctAnswers > this.MAX_QUESTIONS / 2){
                    this.isWin = true;
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
        }
        return isGameFinished;
    }

    private getTeacherQuestions() {
        this.getQuizGameConfiguration();
    }

    private getStudentQuestions() {
        this.studentService.getStudentLoged()
            .subscribe((student: Student) => {
                this.studentId = student.id;
                this.classroomId = student.classroomId;
                this.getQuizGameConfiguration();
            });
    }

    public getQuizGameConfiguration() {
        this.quizzGameClassroomConfigurationService.getQuizzGameClassroomConfigurationByClassroomId(this.classroomId)
            .subscribe((currentConfiguration: QuizzGameClassroomConfiguration) => {
                this.currentConfiguration = currentConfiguration;
                this.currentConfigurationId = currentConfiguration.id;
                this.MAX_QUESTIONS = currentConfiguration.numberOfQuestions;

                this.availableQuestions = currentConfiguration.questions;
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
                this.isAbandoned = false;
                this.isTimeOver = false;
                this.isWin = false;
                this.currentQuiz = 0;
                this.answerSelected = false;
                this.correctAnswers = 0;
                this.incorrectAnswers = 0;
                this.gameTimer.startTimer(this.currentConfiguration.time);

                if (this.user.role === 'STUDENT') {
                    const startEvent = this.quizzGameEventGeneratorService.generateStartEvent(this.cardQuiz, this.gameId, this.studentId, this.gameTimer.getLeftTime());
                    this.gameEventService.createGameEvent(startEvent).subscribe(event => this.gamePlayId = event.gamePlayId);
                }
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
