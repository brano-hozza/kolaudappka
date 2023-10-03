import { DrinkType, SnackType } from '..'

export interface CreateDrinkOrderDTO {
    type: DrinkType
    user: string
}

export interface CreateSnackOrderDTO {
    type: SnackType
    user: string
}

export interface DrinkOrderDTO {
    id: number
    user: string
    resolved: boolean
    drinkType: DrinkType
}

export interface DrinkStatusDTO {
    id: number
    drinkType: DrinkType
    available: boolean
}
