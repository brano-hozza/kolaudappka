export enum EntityType {
    Drink = 'drink',
    Snack = 'snack',
    Game = 'game',
}

export interface Entity {
    id: number
    entityType: EntityType
}

export interface Drink extends Entity {
    entityType: EntityType.Drink
    drinkType: DrinkType
    name: string
}

export interface Snack extends Entity {
    entityType: EntityType.Snack
}

export interface Game extends Entity {
    entityType: EntityType.Game
}

export enum DrinkType {
    AperolSpritz = 'Aperol Spritz',
    Mojito = 'Mojito',
    Daiquiri = 'Daiquiri',
    HugoSpritz = 'Hugo Spritz',
    GinTonic = 'Gin Tonic',
}
