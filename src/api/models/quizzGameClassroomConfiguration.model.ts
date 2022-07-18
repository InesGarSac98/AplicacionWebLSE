import { QuizzGameQuestion } from "./quizzGameQuestion.model";

export interface QuizzGameClassroomConfiguration{
    id: number;
    gameId:number;
    classroomId: number,
    time: number,
    numberOfQuestions: number,
    questions: QuizzGameQuestion[]
}
