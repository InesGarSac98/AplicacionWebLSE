import { Word } from "./word.model";

export interface QuizzGameAnswer {
    id: number;
    questionId : number;
    isImage: boolean;
    wordId : number;
    word: Word;
    isCorrect: boolean;
}
