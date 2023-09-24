<template>
    <div>
        <h1>Drinks</h1>
        <button @click="addDrink(DrinkType.AperolSpritz)">Aperol Spritz</button>
        <button @click="addDrink(DrinkType.Mojito)">Mojito</button>
        <button @click="addDrink(DrinkType.Daiquiri)">Daiquiri</button>
        <button @click="addDrink(DrinkType.HugoSpritz)">Hugo Spritz</button>
        <button @click="addDrink(DrinkType.GinTonic)">Gin Tonic</button>
    </div>
</template>

<script setup lang="ts">
import { DrinkType } from '@/types'

const addDrink = (drinkType: DrinkType) => {
    console.log(drinkType)
    useFetch('/api/drink', {
        method: 'POST',
        body: {
            drinkType,
            name: localStorage.getItem('name'),
        },
    })
}
</script>
