export enum EntityType {
    Drink = 'drink',
    Snack = 'snack',
    Game = 'game',
}

export interface Entity {
    id: number
    resolved: boolean
}

export enum DrinkType {
    AperolSpritz = 'Aperol Spritz',
    Mojito = 'Mojito',
    Daiquiri = 'Daiquiri',
    HugoSpritz = 'Hugo Spritz',
    GinTonic = 'Gin Tonic',
}

export interface Drink extends Entity {
    drinkType: DrinkType
    name: string
}

export interface Snack extends Entity {}

export interface Game extends Entity {}
