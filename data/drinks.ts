import { DrinkType } from '@/types'

type Title = {
    text: string
    color: string
}
type Drink = {
    type: DrinkType
    image: string
    imageSize?: string
    titles: Title[]
    backgroundColor: string
    available: boolean
    ordered: boolean
}

type RawDrink = Omit<Drink, 'available' | 'ordered'>
// Toto ti odstrani z typu fieldy

export const rawCocktails: RawDrink[] = [
    {
        type: DrinkType.AperolSpritz,
        image: '/img/drinks/aperol.png',
        titles: [
            {
                text: 'Aperol',
                color: 'orange',
            },
            {
                text: 'Spritz',
                color: 'light-orange',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Mojito,
        image: '/img/drinks/mojito.png',
        titles: [
            {
                text: 'Mojito',
                color: 'turquoise',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.Mojito),
        ordered: isOrdered(DrinkType.Mojito),
    },
    {
        type: DrinkType.Daiquiri,
        image: '/img/drinks/daiquiri.png',
        titles: [
            {
                text: 'Daiquiri',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.Daiquiri),
        ordered: isOrdered(DrinkType.Daiquiri),
    },
    {
        type: DrinkType.HugoSpritz,
        image: '/img/drinks/hugospritz.png',
        titles: [
            {
                text: 'Hugo',
                color: 'light-yellow',
            },
            {
                text: 'Spritz',
                color: 'light-green',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.HugoSpritz),
        ordered: isOrdered(DrinkType.HugoSpritz),
    },
    {
        type: DrinkType.GinTonic,
        image: '/img/drinks/gintonic.png',
        titles: [
            {
                text: 'Gin',
                color: 'white',
            },
            {
                text: 'Tonic',
                color: 'light-nude',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.GinTonic),
        ordered: isOrdered(DrinkType.GinTonic),
    },
    {
        type: DrinkType.LimoncelloProsecco,
        image: '/img/drinks/limoncelloprosecco.png',
        imageSize: '100',
        titles: [
            {
                text: 'Limoncello',
                color: 'limoncello-yellow',
            },
            {
                text: 'Prosecco',
                color: 'nude',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.LimoncelloProsecco),
        ordered: isOrdered(DrinkType.LimoncelloProsecco),
    },
    {
        type: DrinkType.Mimosa,
        image: '/img/drinks/mimosa.png',
        imageSize: '100',
        titles: [
            {
                text: 'Mimosa',
                color: 'peach',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.Mimosa),
        ordered: isOrdered(DrinkType.Mimosa),
    },
    {
        type: DrinkType.WhiteWine,
        image: '/img/drinks/whitewine.png',
        titles: [
            {
                text: 'Biele',
                color: 'beige',
            },
            {
                text: 'Víno',
                color: 'white',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.WhiteWine),
        ordered: isOrdered(DrinkType.WhiteWine),
    },
    {
        type: DrinkType.RedWine,
        image: '/img/drinks/redwine.png',
        titles: [
            {
                text: 'Červené',
                color: 'red',
            },
            {
                text: 'Víno',
                color: 'white',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.RedWine),
        ordered: isOrdered(DrinkType.RedWine),
    },
    {
        type: DrinkType.RandomAlco,
        image: '/img/drinks/random.png',
        titles: [
            {
                text: 'Náhodný',
                color: 'white',
            },
            {
                text: 'Drink',
                color: 'white',
            },
        ],
        backgroundColor: 'bg-white',
        available: true,
        ordered: false,
    },
]

export const mocktails: Drink[] = [
    {
        type: DrinkType.VirginMojito,
        image: '/img/drinks/mojito.png',
        titles: [
            {
                text: 'Virgin',
                color: 'white',
            },
            {
                text: 'Mojito',
                color: 'turquoise',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.VirginMojito),
        ordered: isOrdered(DrinkType.VirginMojito),
    },
    {
        type: DrinkType.SunriseNonTequila,
        image: '/img/drinks/nonTequilaSunrise.png',
        titles: [
            {
                text: 'Non Tequila',
                color: 'light-orange',
            },
            {
                text: 'Sunrise',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.SunriseNonTequila),
        ordered: isOrdered(DrinkType.SunriseNonTequila),
    },
    {
        type: DrinkType.VirginMimosa,
        image: '/img/drinks/mimosa.png',
        titles: [
            {
                text: 'Virgin',
                color: 'white',
            },
            {
                text: 'Mimosa',
                color: 'orange',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.VirginMimosa),
        ordered: isOrdered(DrinkType.VirginMimosa),
    },
    {
        type: DrinkType.GinTonicWithoutGin,
        image: '/img/drinks/gintonic.png',
        titles: [
            {
                text: 'Gin Tonic',
                color: 'white',
            },
            {
                text: 'Without Gin',
                color: 'light-nude',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.GinTonicWithoutGin),
        ordered: isOrdered(DrinkType.GinTonicWithoutGin),
    },
    {
        type: DrinkType.JazzyApple,
        image: '/img/drinks/jazzyapple.png',
        titles: [
            {
                text: 'Jazzy',
                color: 'white',
            },
            {
                text: 'Apple',
                color: 'blush-pink',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.JazzyApple),
        ordered: isOrdered(DrinkType.JazzyApple),
    },
    {
        type: DrinkType.RoyRogers,
        image: '/img/drinks/royrogers.png',
        titles: [
            {
                text: 'Roy',
                color: 'brown',
            },
            {
                text: 'Rogers',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
        available: isAvailable(DrinkType.RoyRogers),
        ordered: isOrdered(DrinkType.RoyRogers),
    },
    {
        type: DrinkType.RandomNonAlco,
        image: '/img/drinks/random.png',
        titles: [
            {
                text: 'Náhodný',
                color: 'white',
            },
            {
                text: 'Drink',
                color: 'white',
            },
        ],
        backgroundColor: 'bg-white',
        available: true,
        ordered: false,
    },
]
