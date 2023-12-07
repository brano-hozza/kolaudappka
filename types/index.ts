export enum DrinkType {
    AperolSpritz,
    Mojito,
    Daiquiri,
    HugoSpritz,
    GinTonic,
    RedWine,
    WhiteWine,
    LimoncelloProsecco,
    Mimosa,
    TequilaSunrise,
    RandomAlco,
    VirginMojito,
    SunriseNonTequila,
    VirginMimosa,
    GinTonicWithoutGin,
    JazzyApple,
    RoyRogers,
    RandomNonAlco,
    CustomAlco,
    CustomNonAlco,
}

export enum SnackType {
    Sushi,
    Chips,
    Nachos,
    Peanuts,
    Macarons,
}

export enum EntityType {
    DrinkOrder = 'drink',
    DrinkStatus = 'drink-status',
    SnackOrder = 'snack',
    SnackStatus = 'snack-status',
    GameVote = 'game',
    Rating = 'rating',
}

export enum GameType {
    ShitHappens,
    Kotatka,
    UnoFlip,
    KrycieMena,
    CardsAgainstHumanity,
    Bang,
    Piskvorky,
    Savana,
    DoodleDungeon,
}

export enum PartyFormType {
    Info,
    Drinks,
    Snacks,
    Games,
}

export type Title = {
    text: string
    color: string
}

export type Drink = {
    type: DrinkType
    image: string
    imageSize?: string
    titles: Title[]
    backgroundColor: string
    available: boolean
    ordered: boolean
}

export type RawDrink = Omit<Drink, 'available' | 'ordered'>
