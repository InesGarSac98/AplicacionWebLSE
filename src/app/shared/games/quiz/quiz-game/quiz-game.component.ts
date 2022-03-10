import { Component, OnInit } from '@angular/core';
import { ClassroomWord } from 'src/api/models/classroomWord';
import { QuizzGameQuestion } from 'src/api/models/quizzGameQuestion.model';
import { Student } from 'src/api/models/student.model';
import { User } from 'src/api/models/user.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { QuizzGameQuestionService } from 'src/api/services/quizz-game-question-service/quizz-game-question.service';
import { StudentsService } from 'src/api/services/students-service/students.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { BoardCard } from '../../memory/memory-game.component';

@Component({
    selector: 'app-quiz-game',
    templateUrl: './quiz-game.component.html',
    styleUrls: ['./quiz-game.component.scss']
})

export class QuizGameComponent implements OnInit {
    public cardQuiz: IQuiz[];
    public rotateClass: boolean = true;
    currentQuiz = 0;
    answerSelected = false;
    correctAnswers = 0;
    incorrectAnswers = 0;
    result = false;
    private availableWords: Word[];
    private availableQuestions: QuizzGameQuestion[];
    private studentId: number;
    private wordIds: number[];

    private readonly MAX_QUESTIONS = 3;

    constructor(
        private userService: UsersService,
        private wordsService: WordsService,
        private classroomService: ClassroomsService,
        private studentService: StudentsService,
        private quizzGameQuestionservice: QuizzGameQuestionService
    ) { }

    ngOnInit(): void {

        this.userService.getUserLoged().subscribe((user: User) => {
            if (user.role === 'STUDENT') {
                this.getStudentQuestions();
            }
            else if (user.role === 'TEACHER') {
                this.getTeacherQuestions();
            }
        });

       /* this.cardQuiz = [
            {
                question: "¿Hola?",
                answer: [
                    { option: "assets/images/dict/adios.png", correct: false },
                    { option: "assets/images/dict/hola.png", correct: true },
                    { option: "assets/images/dict/de-nada.png", correct: false },
                    { option: "assets/images/dict/nombre.png", correct: false },
                ]
            }, {
                question: "adios?",
                answer: [
                    { option: "assets/images/dict/hola.png", correct: true },
                    { option: "assets/images/dict/buenos-dias.png", correct: false },
                    { option: "assets/images/dict/si.png", correct: false },
                    { option: "assets/images/dict/buenas-tardes.png", correct: false },
                ]
            },
            {
                question: "nombre?",
                answer: [
                    { option: "assets/images/dict/de-nada.png", correct: false },
                    { option: "assets/images/dict/nombre.png", correct: true },
                    { option: "assets/images/dict/buenos-dias.png", correct: false },
                    { option: "assets/images/dict/buenas-tardes.png", correct: false },
                ]
            },
        ]*/
    }

    //Incrementa cuando seleccionamps la respuesta correcta
    onAnswer(option: boolean) {
        this.rotateClass = false;
        console.log(option);

        this.answerSelected = true;
        setTimeout(() => {
            this.currentQuiz++;
            this.answerSelected = false;
            this.rotateClass = true;
        }, 2000);

        if (option) {
            this.correctAnswers++;
        } else {
            this.incorrectAnswers++;
        }
    }

    showResult() {
        this.result = true;
    }

    private getTeacherQuestions() {
        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                this.availableWords = words;
                this.wordIds = words.map(word => word.id);
                this.getQuizzGameQuestions();
            });
    }

    private getQuizzGameQuestions() {
        this.quizzGameQuestionservice.getQuizzGameQuestionsByWordId(this.wordIds)
            .subscribe((questions: QuizzGameQuestion[]) => {
                this.availableQuestions = questions;
                //Barajar preguntas y coger 6
                this.availableQuestions.sort(() => Math.random() - 0.5);
                this.cardQuiz = [];
                for (let i = 0; i < this.MAX_QUESTIONS; i++) {
                    const element = this.availableQuestions[i];
                    this.cardQuiz.push({
                        question: element.name,
                        showImage: element.showImage,
                        answer: element.answers.map(a => (
                            {
                                option: a.name,
                                correct: a.correct,
                                showImage: a.showImage
                            })).sort(() => Math.random() - 0.5)
                    });
                }
                console.log(this.cardQuiz);
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
    //TODO: Pedir las palabras de la clase -> Con el wordId, pedir las preguntas que tengan ese wordId -> De todas esas questions, barajo y cojo el nº de preguntas que sean.
    //Barajo las respuestas y las pinto en el jego
}

export class IQuiz {
    question: string;
    showImage: boolean;
    answer: {
        option: string,
        showImage: boolean,
        correct: boolean
    }[];
}
