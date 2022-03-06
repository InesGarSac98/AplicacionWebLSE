import { MemoryGameEventBoardTileStatus } from "./MemoryGameEventBoardTileStatus";

export interface MemoryGameEventBoardTile {
    wordId: number;
    contentType: string;
    content: string;
    status: MemoryGameEventBoardTileStatus;
}
