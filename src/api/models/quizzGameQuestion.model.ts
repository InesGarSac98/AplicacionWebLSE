import { QuizzGameAnswer } from "./quizzGameAnswer.model";
import { Word } from "./word.model";

export interface QuizzGameQuestion {
    id: number;
    name: string;
    wordId : number;
    gameId : number;
    showImage: boolean;
    answers: QuizzGameAnswer[];
    word: Word;
}
