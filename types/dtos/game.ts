import { GameType } from '..'

export interface VoteForGameDTO {
    type: GameType
    user: string
}

export interface GameDTO {
    id: number
    user: string
    type: GameType
}
