import { Game } from "./game.model";

export interface ClassroomGame {
    id: number;
    classroomId: number;
    gameId: number;
    game: Game;
}
