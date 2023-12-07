<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <p
            ref="title"
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Výber drinkov
        </p>
        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <div
                v-for="drink in rawCocktails"
                :key="drink.type"
                :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
                class="flex flex-col items-center justify-between gap-8 my-4"
            >
                <span class="flex flex-col justify-center items-center gap-4">
                    <p
                        v-for="title in drink.titles"
                        :key="title.text"
                        class="font-basic text-7xl"
                        :class="[`font-glow-${title.color}`]"
                    >
                        {{ title.text }}
                    </p>
                </span>

                <CircleImageButton
                    :image-url="drink.image"
                    :background-color="drink.backgroundColor"
                    :selected="selectedDrink === drink.type"
                    size="lg"
                    @click="selectDrink(drink.type)"
                >
                </CircleImageButton>
            </div>
        </div>
        <p class="font-basic font-glow-pink text-7xl my-10 text-center">
            Moktejly
        </p>
        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <div
                v-for="drink in rawMocktails"
                :key="drink.type"
                :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
                class="flex flex-col items-center justify-between gap-8 my-4"
            >
                <span class="flex flex-col justify-center items-center gap-4">
                    <p
                        v-for="title in drink.titles"
                        :key="title.text"
                        class="font-basic text-7xl"
                        :class="[`font-glow-${title.color}`]"
                    >
                        {{ title.text }}
                    </p>
                </span>

                <CircleImageButton
                    :image-url="drink.image"
                    :image-size="drink.imageSize"
                    :background-color="drink.backgroundColor"
                    :selected="selectedDrink === drink.type"
                    size="lg"
                    @click="selectDrink(drink.type)"
                >
                </CircleImageButton>
            </div>
        </div>
        <CircleImageButton
            floating
            icon="ri:shopping-basket-2-line"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('click')"
        />
    </div>
</template>

<script setup lang="ts">
import { rawMocktails, rawCocktails } from '~/data/drinks'
import { DrinkType } from '~/types'

defineEmits(['click'])

const refs = ref<Record<string, HTMLDivElement>>({})
const selectedDrink = ref<DrinkType | null>(null)
const selectDrink = (drinkType: DrinkType) => {
    selectedDrink.value = drinkType
}
</script>
