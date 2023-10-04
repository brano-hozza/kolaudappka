import { DrinkType, GameType, SnackType } from '~/types'

export interface Entity {
    id: number
}

export interface DrinkOrder extends Entity {
    user: string
    drinkType: DrinkType
}

export interface DrinkStatus extends Entity {
    drinkType: DrinkType
    available: boolean
}

export interface SnackOrder extends Entity {
    user: string
    snackType: SnackType
}

export interface SnackStatus extends Entity {
    snackType: SnackType
    available: boolean
}

export interface GameVote extends Entity {
    user: string
    gameType: GameType
}

export interface Rating extends Entity {
    user: string
    stars: number
    text: string
}
