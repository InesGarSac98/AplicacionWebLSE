import { Word } from "./word.model";

export interface ClassroomWord {
    id: number;
    wordId: number;
    classroomId: number;
    word: Word;
}
