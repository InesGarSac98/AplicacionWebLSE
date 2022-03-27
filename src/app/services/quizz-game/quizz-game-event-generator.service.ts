import { Injectable } from '@angular/core';
import { GameEvent } from 'src/api/models/GameEvents/gameEvent.model';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { QuizzGameEvent } from 'src/api/models/GameEvents/QuizzGame/quizzGameEvent.model';
import { QuizzGameEventTypes } from 'src/api/models/GameEvents/QuizzGame/QuizzGameEventTypes';
import { IQuiz } from 'src/app/shared/games/quiz/quiz-game/quizz-game.component';

@Injectable({
    providedIn: 'root'
})
export class QuizzGameEventGeneratorService {

    constructor() { }

    public generateStartEvent(cardQuiz: IQuiz[], gameId: number, studentId: number, leftTime: number): GameEvent {
        const quizzGameEvent: QuizzGameEvent = {
            type: QuizzGameEventTypes.GAME_START,
            questionId: null,
            answerId: null,
            questions: cardQuiz
        };

        const startEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            status: GameStatuses.STARTING,
            gamePlayId: -1,
            score: 0,
            events: JSON.stringify(quizzGameEvent)
        };

        return startEvent;
    }

    public generateAnswerClickedEvent(cardQuiz: IQuiz[], questionId: number, answerId: number, gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const quizzGameEvent: QuizzGameEvent = {
            type: QuizzGameEventTypes.ANSWERED,
            questionId: questionId,
            answerId: answerId,
            questions: cardQuiz
        };

        const answerClickedEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.IN_PROGRESS,
            events: JSON.stringify(quizzGameEvent)
        };

        return answerClickedEvent;
    }

    public generateWinEvent(cardQuiz: IQuiz[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const quizzGameEvent: QuizzGameEvent = {
            type: QuizzGameEventTypes.GAME_FINISHED,
            questionId: null,
            answerId: null,
            questions: cardQuiz
        };

        const winEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.WIN,
            events: JSON.stringify(quizzGameEvent)
        };

        return winEvent;
    }

    public generateAbandoneEvent(cardQuiz: IQuiz[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const quizzGameEvent: QuizzGameEvent = {
            type: QuizzGameEventTypes.GAME_FINISHED,
            questionId: null,
            answerId: null,
            questions: cardQuiz
        };

        const abandoneEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.ABANDONE,
            events: JSON.stringify(quizzGameEvent)
        };

        return abandoneEvent;
    }

    public generateLoseEvent(cardQuiz: IQuiz[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const quizzGameEvent: QuizzGameEvent = {
            type: QuizzGameEventTypes.GAME_FINISHED,
            questionId: null,
            answerId: null,
            questions: cardQuiz
        };

        const loseEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.LOSE,
            events: JSON.stringify(quizzGameEvent)
        };

        return loseEvent;
    }
}
