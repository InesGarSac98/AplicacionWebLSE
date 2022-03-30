import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

    @Output() public goBackClicked = new EventEmitter();
    @Input() public cardTitle: string;
    constructor() { }

    ngOnInit() {
        this.formGroup = new FormGroup({
            time: new FormControl(''),
            questions: new FormArray([])
        });
    }
    panelOpenState = false;
    public formGroup: FormGroup;

    get questionsFormArray(){
        return (this.formGroup.controls.questions as FormArray);
    }

    public addCard(): void {
        (this.formGroup.controls.questions as FormArray).push(new FormGroup({
            question: new FormControl('', [Validators.maxLength(100), Validators.required]),
            isImage: new FormControl(''),
            answers: new FormArray([
                new FormGroup({
                    answer: new FormControl(''),
                    isImage: new FormControl(''),
                    isCorrect: new FormControl('')
                }),
                new FormGroup({
                    answer: new FormControl(''),
                    isImage: new FormControl(''),
                    isCorrect: new FormControl('')
                }),
                new FormGroup({
                    answer: new FormControl(''),
                    isImage: new FormControl(''),
                    isCorrect: new FormControl('')
                }),
            ])
        }));
    }

}
