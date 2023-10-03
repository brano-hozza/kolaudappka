import { DrinkType, GameType, SnackType } from '~/types'

export interface Entity {
    id: number
    user: string
}

export interface DrinkOrder extends Entity {
    drinkType: DrinkType
}

export interface DrinkStatus extends Entity {
    drinkType: DrinkType
    available: boolean
}

export interface SnackOrder extends Entity {
    snackType: SnackType
}

export interface SnackStatus extends Entity {
    snackType: SnackType
    available: boolean
}

export interface GameVote extends Entity {
    gameType: GameType
}
