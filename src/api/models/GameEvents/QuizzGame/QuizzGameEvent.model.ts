import { IQuiz } from "src/app/shared/games/quiz/quiz-game/quizz-game.component";
import { QuizzGameEventTypes } from "./QuizzGameEventTypes";

export interface QuizzGameEvent{
    type: QuizzGameEventTypes;
    questionId: number | null;
    answerId: number | null;
    questions: IQuiz[];
}
