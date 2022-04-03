import { QuizzGameAnswer } from "./quizzGameAnswer.model";
import { Word } from "./word.model";

export interface QuizzGameQuestion {
    id: number;
    name: string;
    wordId: number;
    quizzGameClassroomConfigurationId: number;
    isImage: boolean;
    answers: QuizzGameAnswer[];
    word: Word;
}
