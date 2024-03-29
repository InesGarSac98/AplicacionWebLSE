import { Injectable } from '@angular/core';
import { GameEvent } from 'src/api/models/GameEvents/gameEvent.model';
import { GameStatuses } from 'src/api/models/GameEvents/gameStatuses';
import { MemoryGameEvent } from 'src/api/models/GameEvents/MemoryGame/memoryGameEvent.model';
import { MemoryGameEventBoardTile } from 'src/api/models/GameEvents/MemoryGame/MemoryGameEventBoardTile';
import { MemoryGameEventBoardTileStatus } from 'src/api/models/GameEvents/MemoryGame/MemoryGameEventBoardTileStatus';
import { MemoryGameEventTypes } from 'src/api/models/GameEvents/MemoryGame/MemoryGameEventTypes';
import { BoardCard } from 'src/app/shared/games/memory/memory-game.component';

@Injectable({
    providedIn: 'root'
})
export class MemoryGameEventGeneratorService {

    constructor() { }

    public generateStartEvent(boardCards: BoardCard[], gameId: number, studentId: number, leftTime: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.GAME_START,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: MemoryGameEventBoardTileStatus.UNSELECTED,
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const startEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: -1,
            score: 0,
            status: GameStatuses.STARTING,
            events: JSON.stringify(memoryGameEvent)
        };

        return startEvent;
    }

    public generateCardClickedEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], selectedCards: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.CARD_CLICKED,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, selectedCards),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const cardClickedEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.IN_PROGRESS,
            events: JSON.stringify(memoryGameEvent)
        };

        return cardClickedEvent;
    }

    public generatePairSuccessEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.PAIR_SUCCESS,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, []),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const pairSuccessEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.IN_PROGRESS,
            events: JSON.stringify(memoryGameEvent)
        };

        return pairSuccessEvent;
    }

    public generatePairFailEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.PAIR_FAIL,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, []),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const pairFailEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.IN_PROGRESS,
            events: JSON.stringify(memoryGameEvent)
        };

        return pairFailEvent;
    }

    public generateWinEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], selectedCards: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.GAME_FINISHED,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, selectedCards),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const winEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.WIN,
            events: JSON.stringify(memoryGameEvent)
        };

        return winEvent;
    }

    public generateAbandoneEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], selectedCards: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.GAME_FINISHED,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, selectedCards),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const abandoneEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.ABANDONE,
            events: JSON.stringify(memoryGameEvent)
        };

        return abandoneEvent;
    }

    public generateLoseEvent(boardCards: BoardCard[], pairsAchieved: BoardCard[], selectedCards: BoardCard[], gameId: number, studentId: number, score:number, leftTime: number, gamePlayId: number): GameEvent {
        const memoryGameEvent: MemoryGameEvent = {
            type: MemoryGameEventTypes.GAME_FINISHED,
            board: boardCards.map(tile => {
                const memoryGameEventTile: MemoryGameEventBoardTile = {
                    wordId: tile.wordId,
                    status: this.getBoardTileStatus(tile, pairsAchieved, selectedCards),
                    contentType: tile.contentType,
                    content: tile.content
                };
                return memoryGameEventTile;
            })
        };

        const loseEvent: GameEvent = {
            gameId: gameId,
            studentId: studentId,
            date: new Date(),
            leftTime: leftTime,
            gamePlayId: gamePlayId,
            score: score,
            status: GameStatuses.LOSE,
            events: JSON.stringify(memoryGameEvent)
        };

        return loseEvent;
    }

    private getBoardTileStatus(tile: BoardCard, pairsAchieved: BoardCard[], selectedCards: BoardCard[]) : MemoryGameEventBoardTileStatus {
        if(selectedCards.some(card => card.wordId === tile.wordId && card.contentType === tile.contentType)){
            return MemoryGameEventBoardTileStatus.SELECTED;
        }

        if(pairsAchieved.some(card => card.wordId === tile.wordId && card.contentType === tile.contentType)){
            return MemoryGameEventBoardTileStatus.CORRECT;
        }

        return MemoryGameEventBoardTileStatus.UNSELECTED
    }
}
