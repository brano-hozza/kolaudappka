<template>
    <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4 mt-10">
        <div
            v-for="drink in drinks"
            :key="drink.type"
            class="flex flex-col items-center justify-between"
        >
            <img :src="drink.title" />
            <CircleImageButton
                :image-url="drink.image"
                :background-color="drink.backgroundColor"
                @click="addDrink(drink.type)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DrinkType } from '@/types'

const drinks = [
    {
        type: DrinkType.AperolSpritz,
        image: '/img/drinks/aperol.png',
        title: '/img/titles/aperol.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Mojito,
        image: '/img/drinks/mojito.png',
        title: '/img/titles/mojito.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Daiquiri,
        image: '/img/drinks/daiquiri.png',
        title: '/img/titles/daiquiri.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.HugoSpritz,
        image: '/img/drinks/hugospritz.png',
        title: '/img/titles/hugo.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.GinTonic,
        image: '/img/drinks/gintonic.png',
        title: '/img/titles/gin.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.LimoncelloProsecco,
        image: '/img/drinks/limoncelloprosecco.png',
        title: '/img/titles/limoncelloprosecco.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Mimosa,
        image: '/img/drinks/mimosa.png',
        title: '/img/titles/mimosa.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.WhiteWine,
        image: '/img/drinks/whitewine.png',
        title: '/img/titles/whitewine.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.RedWine,
        image: '/img/drinks/redwine.png',
        title: '/img/titles/redwine.png',
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Random,
        image: '/img/drinks/random.png',
        title: '/img/titles/random.png',
        backgroundColor: 'bg-white',
    },
]

const addDrink = (drinkType: DrinkType) => {
    const drink = drinkType === DrinkType.Random ? getRandomDrink() : drinkType
    useFetch('/api/drink', {
        method: 'POST',
        body: {
            drinkType: drink,
            name: localStorage.getItem('name'),
        },
    })
}

const getRandomDrink = () => {
    const values = Object.keys(DrinkType) as Array<keyof typeof DrinkType>
    let enumKey = values[Math.floor(Math.random() * values.length)]
    while (enumKey === 'Random')
        enumKey = values[Math.floor(Math.random() * values.length)]
    return DrinkType[enumKey]
}
</script>
