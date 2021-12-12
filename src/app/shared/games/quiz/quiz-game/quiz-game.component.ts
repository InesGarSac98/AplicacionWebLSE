import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz-model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {

    cardQuiz:Quiz[] = [];
    currentQuiz = 0;
    answerSelected = false;
    correctAnswers = 0;
    incorrectAnswers = 0;
    result=false;

    constructor(private quizService: QuizService) { }

    ngOnInit() : void{
        this.cardQuiz = this.quizService.getQuizzes();
    }

    //Incrementa cuando seleccionamps la respuesta correcta
    onAnswer(option:boolean){
        console.log(option);

        this.answerSelected = true;
        setTimeout(() => {
            this.currentQuiz++;
            this.answerSelected = false;
        },3000);

        if(option){
            this.correctAnswers++;
        }else{
            this.incorrectAnswers++;
        }

    }

    showResult(){
        this.result = true;
    }

}
