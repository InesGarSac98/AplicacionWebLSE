import { Injectable } from '@angular/core';
import { Quiz } from './quiz-model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

    cardQuiz: Quiz[] = [
        {
            question:"¿Hola?",
            answer: [
                {option:'assets/images/dict/hola.png',correct: false},
                {option:'Hello',correct: true},
            ]
        },
        {
            question:"adios?",
            answer: [
                {option:'Good bye',correct: false},
                {option:'bye',correct: true},
            ]
        },
        {
            question:"nombre?",
            answer: [
                {option:'surname',correct: false},
                {option:'name',correct: true},
            ]
        },
    ]
constructor() { }

    getQuizzes(){
        return this.cardQuiz;
    }
}

