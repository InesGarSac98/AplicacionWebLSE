import { Word } from "./word.model";

export interface QuizzGameAnswer {
    id: number;
    name: string;
    correct: boolean;
    questionId : number;
    showImage: boolean;
    wordId : number;
    word: Word;
}
