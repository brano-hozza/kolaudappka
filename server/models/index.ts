import { DrinkType, GameType } from '~/types'

export interface Entity {
    id: number
    user: string
}

export interface DrinkOrder extends Entity {
    drinkType: DrinkType
    resolved: boolean
}

export interface DrinkStatus extends Entity {
    drinkType: DrinkType
    available: boolean
}

export interface Snack extends Entity {}

export interface GameVote extends Entity {
    gameType: GameType
}
