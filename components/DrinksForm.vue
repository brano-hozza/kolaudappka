<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <p
            ref="title"
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Menu drinkov 🍹
        </p>
        <p class="font-basic font-glow-pink text-7xl my-10 text-center">
            Koktejly
        </p>
        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <!-- Default cocktails -->
            <div
                v-for="drink in cocktails"
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
                    :selected="selectedDrinks.includes(drink.type)"
                    size="lg"
                    @click="selectDrink(drink.type)"
                >
                </CircleImageButton>
            </div>
            <!-- Add drink button -->
            <div class="flex flex-col items-center justify-between gap-8 my-4">
                <span class="flex flex-col justify-center items-center gap-4"
                    ><p class="font-basic text-7xl font-glow-white">
                        Nový <br />koktejl
                    </p></span
                >
                <CircleImageButton
                    icon="charm:plus"
                    icon-size="30%"
                    size="lg"
                    background-color="bg-pinky"
                    @click="addingCocktail = true"
                >
                </CircleImageButton>
            </div>
        </div>
        <p class="font-basic font-glow-pink text-7xl my-10 text-center">
            Moktejly
        </p>
        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <!-- Default mocktails -->
            <div
                v-for="drink in mocktails"
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
                    :selected="selectedDrinks.includes(drink.type)"
                    size="lg"
                    @click="selectDrink(drink.type)"
                >
                </CircleImageButton>
            </div>
            <!-- Add drink button -->
            <div class="flex flex-col items-center justify-between gap-8 my-4">
                <span class="flex flex-col justify-center items-center gap-4"
                    ><p class="font-basic text-7xl font-glow-white">
                        Nový <br />moktejl
                    </p></span
                >
                <CircleImageButton
                    icon="charm:plus"
                    icon-size="30%"
                    size="lg"
                    background-color="bg-pinky"
                    @click="addingMocktail = true"
                >
                </CircleImageButton>
            </div>
        </div>
        <CircleImageButton
            v-if="selectedDrinks.length"
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('nextPage')"
        />
        <NewItemModal
            v-if="addingCocktail || addingMocktail"
            :title="addingCocktail ? 'Nový koktejl' : 'Nový moktejl'"
            :title-input-label="
                addingCocktail ? '*Názov koktejlu' : '*Názov moktejlu'
            "
            :title-input-placeholder="
                addingCocktail ? 'Názov koktejlu' : 'Názov moktejlu'
            "
            @add-item="addDrink"
            @close="
                () => {
                    addingCocktail = false
                    addingMocktail = false
                }
            "
        />
    </div>
</template>

<script setup lang="ts">
import { rawMocktails, rawCocktails } from '~/data/drinks'
import { DrinkType, NewItemData } from '~/types'

defineEmits<{
    (e: 'addDrink'): void
    (e: 'close'): void
    (e: 'nextPage'): void
}>()

const cocktails = ref(rawCocktails)
const mocktails = ref(rawMocktails)

const refs = ref<Record<string, HTMLDivElement>>({})

const selectedDrinks = ref<DrinkType[]>([])
const selectDrink = (drinkType: DrinkType) => {
    if (selectedDrinks.value.includes(drinkType)) {
        selectedDrinks.value = selectedDrinks.value.filter(
            (item) => item !== drinkType
        )
    } else {
        selectedDrinks.value.push(drinkType)
    }
}

const addingCocktail = ref(false)
const addingMocktail = ref(false)

const addDrink = (drinkData: NewItemData) => {
    console.log('add drink')
    const newDrink = {
        type: DrinkType.CustomAlco,
        // TODO: image: drinkData.imageUrl,
        image: '/img/drinks/newdrink.png',
        titles: drinkData.titles,
        backgroundColor: 'bg-black',
    }
    if (addingCocktail.value) {
        cocktails.value.push(newDrink)
        addingCocktail.value = false
    } else if (addingMocktail.value) {
        mocktails.value.push(newDrink)
        addingMocktail.value = false
    }
}
</script>
