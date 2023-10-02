import { DrinkType, GameType } from '~/types'

export interface Entity {
    id: number
    user: string
}

export interface Drink extends Entity {
    drinkType: DrinkType
    resolved: boolean
}

export interface Snack extends Entity {}

export interface GameVote extends Entity {
    gameType: GameType
}
