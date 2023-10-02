import { DrinkType } from '..'

export interface CreateDrinkDTO {
    type: DrinkType
    user: string
}

export interface DrinkDTO {
    id: number
    user: string
    resolved: boolean
    drinkType: DrinkType
}
