import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {
    public cardQuiz: IQuiz[];
    currentQuiz = 0;
    answerSelected = false;
    correctAnswers = 0;
    incorrectAnswers = 0;
    result = false;

    constructor() { }

    ngOnInit() : void{
        this.cardQuiz = this.getQuizzes();
        this.cardQuiz = [
            {
                question:"¿Hola?",
                answer: [
                    {option:"assets/images/dict/adios.png",correct: false},
                    {option:"assets/images/dict/hola.png",correct: true},
                    {option:"assets/images/dict/de-nada.png",correct: false},
                    {option:"assets/images/dict/nombre.png",correct: false},
                ]
            },{
                question:"adios?",
                answer: [
                    {option:"assets/images/dict/hola.png",correct: true},
                    {option:"assets/images/dict/buenos-dias.png",correct: false},
                    {option:"assets/images/dict/si.png",correct: false},
                    {option:"assets/images/dict/buenas-tardes.png",correct: false},
                ]
            },
            {
                question:"nombre?",
                answer: [
                    {option:"assets/images/dict/de-nada.png",correct: false},
                    {option:"assets/images/dict/nombre.png",correct: true},
                    {option:"assets/images/dict/buenos-dias.png",correct: false},
                    {option:"assets/images/dict/buenas-tardes.png",correct: false},
                ]
            },
        ]
    }

    getQuizzes(){
        return this.cardQuiz;
    }

    //Incrementa cuando seleccionamps la respuesta correcta
    onAnswer(option:boolean){
        console.log(option);

        this.answerSelected = true;
        setTimeout(() => {
            this.currentQuiz++;
            this.answerSelected = false;
        },2000);

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

export class IQuiz {
    question: string;
    answer: {
        option : string,
        correct: boolean
    }[];
}
