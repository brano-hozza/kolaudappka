import { RawSnack, SnackType } from '@/types'

export const rawSnacks: RawSnack[] = [
    {
        type: SnackType.Sushi,
        image: '/img/snacks/sushi.png',
        titles: [
            {
                text: 'Sushi',
                color: 'salmon',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Chips,
        image: '/img/snacks/chips.png',
        titles: [
            {
                text: 'Čipsiky',
                color: 'vibrant-yellow',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Nachos,
        image: '/img/snacks/nachos.png',
        titles: [
            {
                text: 'Načosky',
                color: 'nude',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Peanuts,
        image: '/img/snacks/peanuts.png',
        titles: [
            {
                text: 'Oriešky',
                color: 'light-brown',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Macarons,
        image: '/img/snacks/macarons.png',
        titles: [
            {
                text: 'Makrónky',
                color: 'blush-pink',
            },
        ],
        backgroundColor: 'bg-black',
    },
]
