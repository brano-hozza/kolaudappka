import { DrinkType } from '~/types'

export interface Entity {
    id: number
    user: string
    resolved: boolean
}

export interface Drink extends Entity {
    drinkType: DrinkType
}

export interface Snack extends Entity {}

export interface Game extends Entity {}
