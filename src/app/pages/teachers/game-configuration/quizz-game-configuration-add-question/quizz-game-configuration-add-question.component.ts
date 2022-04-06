import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { QuizzGameAnswer } from 'src/api/models/quizzGameAnswer.model';
import { QuizzGameClassroomConfiguration } from 'src/api/models/quizzGameClassroomConfiguration.model';
import { QuizzGameQuestion } from 'src/api/models/quizzGameQuestion.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { QuizzGameAnswerService } from 'src/api/services/quizz-game-answer-service/quizz-game-answer.service';
import { QuizzGameClassroomConfigurationService } from 'src/api/services/quizz-game-classroom-configuration-service/quizz-game-classroom-configuration.service';
import { QuizzGameQuestionService } from 'src/api/services/quizz-game-question-service/quizz-game-question.service';

@Component({
    selector: 'app-quizz-game-configuration-add-question',
    templateUrl: './quizz-game-configuration-add-question.component.html',
    styleUrls: ['./quizz-game-configuration-add-question.component.scss']
})
export class QuizzGameConfigurationAddQuestionComponent implements OnInit {

    @Output() public goBackClicked = new EventEmitter();
    @Input() public gameId: number;
    @Input() public classroomId: number;
    public currentConfigurationId: number;
    public formGroup: FormGroup;
    public classroomWords: Word[];
    public currentConfiguration: QuizzGameClassroomConfiguration;
    public currentQuestions: QuizzGameQuestion[];
    public formGroupIsLoaded: boolean = false;

    public get questionsFormArray() {
        return (this.formGroup.controls.questions as FormArray);
    }

    constructor(
        private quizzGameClassroomConfigurationService: QuizzGameClassroomConfigurationService,
        private quizzGameQuestionService: QuizzGameQuestionService,
        private classroomService: ClassroomsService,
        private quizzGameAnswerService: QuizzGameAnswerService,
    ) { }

    public ngOnInit() {
        this.formGroupIsLoaded = false;
        this.quizzGameClassroomConfigurationService.getQuizzGameClassroomConfigurationByClassroomId(this.classroomId)
            .subscribe(
                (currentConfiguration: QuizzGameClassroomConfiguration) => {
                    this.currentConfiguration = currentConfiguration;
                    this.currentConfigurationId = currentConfiguration.id;

                    this.quizzGameQuestionService.getQuizzGameQuestionsByConfigurationId(this.currentConfiguration.id)
                        .subscribe(
                            (currentQuestions: QuizzGameQuestion[]) => {
                                this.currentQuestions = currentQuestions;
                            },
                            () => {},
                            () => this.loadFormGroup()
                        );
                },
                () => this.loadFormGroup(),
            );

        this.classroomService.getWordsListClassroom(this.classroomId)
            .subscribe((words: ClassroomWord[]) => {
                this.classroomWords = words.map(x => x.word).sort((a, b) => a.name > b.name ? 1 : -1);
            });
    }

    public addCard(): void {
        (this.formGroup.controls.questions as FormArray).push(new FormGroup({
            id: new FormControl(''),
            question: new FormControl('', [Validators.maxLength(100), Validators.required]),
            isImage: new FormControl(false, [Validators.required]),
            answers: new FormArray([
                new FormGroup({
                    id: new FormControl(''),
                    wordId: new FormControl('', [Validators.required]),
                    isCorrect: new FormControl(true, [Validators.required])
                }),
                new FormGroup({
                    id: new FormControl(''),
                    wordId: new FormControl('', [Validators.required]),
                    isCorrect: new FormControl(false, [Validators.required])
                }),
                new FormGroup({
                    id: new FormControl(''),
                    wordId: new FormControl('', [Validators.required]),
                    isCorrect: new FormControl(false, [Validators.required])
                }),
            ])
        }));
    }

    public correctAnswerSelected(answersFormArray: FormArray, correctAnswerIndex: number) {
        for (let i = 0; i < answersFormArray.length; i++) {
            (answersFormArray.controls[i] as FormGroup).controls.isCorrect.setValue(correctAnswerIndex === i);
        }
    }

    public deleteCard(questionId: number, index: number) {
        this.quizzGameQuestionService.deleteQuizzGameQuestion(questionId)
            .subscribe(() => {
                (this.formGroup.controls.questions as FormArray).removeAt(index);
            });
    }

    public saveGameConfiguration() {
        const config = {
            gameId: this.gameId,
            classroomId: this.classroomId,
            time: this.formGroup.controls.time.value
        } as QuizzGameClassroomConfiguration;

        if (!this.currentConfiguration) {
            this.quizzGameClassroomConfigurationService.createQuizzGameClassroomConfiguration(config)
                .subscribe((quizzGameClassroomConfiguration: QuizzGameClassroomConfiguration) => {
                    this.saveQuestions(quizzGameClassroomConfiguration.id);
                });
        }
        else {
            config.id = this.currentConfigurationId;
            this.quizzGameClassroomConfigurationService.updateQuizzGameClassroomConfiguration(config)
                .subscribe((quizzGameClassroomConfiguration: QuizzGameClassroomConfiguration) => {
                    this.saveQuestions(quizzGameClassroomConfiguration.id);
                });
        }
    }

    private loadFormGroup() {
        this.formGroup = new FormGroup({
            id: new FormControl(this.currentConfiguration ? this.currentConfiguration.id : ''),
            time: new FormControl(this.currentConfiguration ? this.currentConfiguration.time : '', [Validators.required]),
            questions: new FormArray(this.currentConfiguration ? this.getCurrentQuestionsFormArray() : [])
        });
        this.formGroupIsLoaded = true;
    }

    private saveQuestions(quizzGameClassroomConfigurationId: number) {
        for (let questionFormControl of this.questionsFormArray.controls) {
            const answersFormArray = (questionFormControl.get('answers') as FormArray);
            const correctAnswer = answersFormArray.controls.find(x => x.get('isCorrect')?.value);
            const question = {
                id: questionFormControl.get('id')?.value,
                quizzGameClassroomConfigurationId: quizzGameClassroomConfigurationId,
                name: questionFormControl.get('question')?.value,
                isImage: questionFormControl.get('isImage')?.value,
                wordId: correctAnswer?.get('wordId')?.value as number
            } as QuizzGameQuestion;

            const observableSaveQuestion = question.id ?
                this.quizzGameQuestionService.updateQuizzGameQuestion(question) :
                this.quizzGameQuestionService.createQuizzGameQuestion(question);

            observableSaveQuestion.subscribe((quizzGameQuestion: QuizzGameQuestion) => {
                    this.saveAnswers((questionFormControl as FormGroup).controls.answers, quizzGameQuestion);
            });

        }
    }

    private saveAnswers(answersFormArray: AbstractControl, quizzGameQuestion: QuizzGameQuestion) {
        for (let answerFormControl of (answersFormArray as FormArray).controls) {
            const answer = {
                id: answerFormControl.get('id')?.value,
                questionId: quizzGameQuestion.id,
                isImage: !quizzGameQuestion.isImage,
                isCorrect: answerFormControl.get('isCorrect')?.value,
                wordId: answerFormControl.get('wordId')?.value
            } as QuizzGameAnswer;

            let observableSaveAnswer = answer.id ?
                this.quizzGameAnswerService.updateQuizzGameAnswer(answer) :
                this.quizzGameAnswerService.createQuizzGameAnswer(answer);

            observableSaveAnswer.subscribe();
        }

    }

    private getCurrentQuestionsFormArray(): FormGroup[] {
        const questionsFormArray: FormGroup[] = [];

        this.currentQuestions.forEach(q => {
            const answersFormArray = new FormArray([]);
            q.answers.forEach(a => {
                answersFormArray.push(new FormGroup({
                    id: new FormControl(a.id),
                    wordId: new FormControl(a.wordId, [Validators.required]),
                    isCorrect: new FormControl(a.isCorrect, [Validators.required])
                }))
            });
            questionsFormArray.push(new FormGroup({
                id: new FormControl(q.id),
                question: new FormControl(q.name, [Validators.maxLength(100), Validators.required]),
                isImage: new FormControl(q.isImage, [Validators.required]),
                wordId: new FormControl(q.wordId),
                answers: answersFormArray
            }));
        })

        return questionsFormArray;
    }
}
