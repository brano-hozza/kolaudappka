import { DrinkType, RawDrink } from '@/types'

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
    },
]

export const rawMocktails: RawDrink[] = [
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
    },
]
