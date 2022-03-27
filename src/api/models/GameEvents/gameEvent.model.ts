import { GameStatuses } from "./gameStatuses";

export interface GameEvent{
    gameId: number;
    studentId: number;
    status: GameStatuses;
    date: Date;
    leftTime: number;
    gamePlayId: number;
    score: number;
    events: string;
}
