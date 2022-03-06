import { MemoryGameEventBoardTile } from "./MemoryGameEventBoardTile";
import { MemoryGameEventTypes } from "./MemoryGameEventTypes";

export interface MemoryGameEvent{
    type: MemoryGameEventTypes;
    score: number;
    board: MemoryGameEventBoardTile[];
}
