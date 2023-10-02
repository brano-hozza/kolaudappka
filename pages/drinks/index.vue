<template>
    <div class="flex flex-col items-center mt-10">
        <img src="/img/titles/aperol.png" />
        <CircleImageButton
            :image-url="'/img/drinks/aperol.png'"
            @click="addDrink(DrinkType.AperolSpritz)"
        />
        <img src="/img/titles/mojito.png" />
        <CircleImageButton
            :image-url="'/img/drinks/mojito.png'"
            @click="addDrink(DrinkType.Mojito)"
        />
        <img src="/img/titles/daiquiri.png" />
        <CircleImageButton
            :image-url="'/img/drinks/daiquiri.png'"
            @click="addDrink(DrinkType.Daiquiri)"
        />
        <img src="/img/titles/hugo.png" />
        <CircleImageButton
            :image-url="'/img/drinks/hugospritz.png'"
            @click="addDrink(DrinkType.HugoSpritz)"
        />
        <img src="/img/titles/gin.png" />
        <CircleImageButton
            :image-url="'/img/drinks/gintonic.png'"
            @click="addDrink(DrinkType.GinTonic)"
        />
        <img src="/img/titles/whitewine.png" />
        <CircleImageButton
            :image-url="'/img/drinks/whitewine.png'"
            @click="addDrink(DrinkType.WhiteWine)"
        />
        <img src="/img/titles/redwine.png" />
        <CircleImageButton
            :image-url="'/img/drinks/redwine.png'"
            @click="addDrink(DrinkType.RedWine)"
        />
        <img src="/img/titles/random.png" />
        <CircleImageButton
            :image-url="'/img/drinks/random.png'"
            @click="addDrink(undefined, true)"
        />
    </div>
</template>

<script lang="ts" setup>
import { DrinkType } from '@/types'

const addDrink = (drinkType?: DrinkType, random: boolean = false) => {
    const drink = random ? getRandomDrink() : drinkType
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
    const enumKey = values[Math.floor(Math.random() * values.length)]
    return DrinkType[enumKey]
}
</script>
