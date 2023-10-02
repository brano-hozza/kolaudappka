import { GameType } from '..'

export interface VoteForGameDTO {
    gameType: GameType
    user: string
}

export interface GameDTO {
    id: number
    user: string
    gameType: GameType
}
