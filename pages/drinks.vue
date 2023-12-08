<template>
    <div class="relative overflow-scroll scrollbar-hide h-[100vh]">
        <loader-component v-if="loading" />
        <div class="overflow-auto scrollbar-hide h-full">
            <p class="font-basic font-glow-pink text-7xl my-10 text-center">
                Objednaj si drink!
            </p>
            <p class="font-basic font-glow-pink text-7xl my-10 text-center">
                Koktejly
            </p>
            <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
                <div
                    v-for="drink in cocktails"
                    :key="drink.type"
                    :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
                    class="flex flex-col items-center justify-between gap-8 my-4"
                    :class="{
                        'grayscale cursor-not-allowed':
                            hasOrder && !drink.ordered,
                    }"
                >
                    <span
                        class="flex flex-col justify-center items-center gap-4"
                    >
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
                        :selected="
                            drink.ordered || selectedDrink === drink.type
                        "
                        :disabled="!drink.available"
                        size="lg"
                        @click="drink.available && selectDrink(drink.type)"
                    >
                        <span
                            v-if="!drink.available"
                            class="absolute rotate-45 w-[120%] h-20 bg-white flex flex-row justify-center items-center font-bold"
                        >
                            <p class="text-red-500 text-xl">Nedostupne 😔</p>
                        </span>
                    </CircleImageButton>
                </div>
            </div>
            <p class="font-basic font-glow-pink text-7xl my-10 text-center">
                Moktejly
            </p>
            <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
                <div
                    v-for="drink in mocktails"
                    :key="drink.type"
                    :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
                    class="flex flex-col items-center justify-between gap-8 my-4"
                    :class="{
                        'grayscale cursor-not-allowed':
                            hasOrder && !drink.ordered,
                    }"
                >
                    <span
                        class="flex flex-col justify-center items-center gap-4"
                    >
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
                        :selected="
                            drink.ordered || selectedDrink === drink.type
                        "
                        :disabled="!drink.available"
                        size="lg"
                        @click="drink.available && selectDrink(drink.type)"
                    >
                        <span
                            v-if="!drink.available"
                            class="absolute rotate-45 w-[120%] h-20 bg-white flex flex-row justify-center items-center font-bold"
                        >
                            <p class="text-red-500 text-xl">Nedostupne 😔</p>
                        </span>
                    </CircleImageButton>
                </div>
            </div>
            <CircleImageButton
                v-if="!hasOrder && selectedDrink != undefined"
                floating
                icon="ri:shopping-basket-2-line"
                size="sm"
                background-color="bg-pinky"
                @click="orderDrink(selectedDrink)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { rawCocktails, rawMocktails } from '../data/drinks'
import { DrinkType } from '@/types'
import { CreateDrinkOrderDTO } from '~/types/dtos'

const refs = ref<Record<string, HTMLDivElement>>({})

const { data: statuses } = await useFetch('/api/drink-status')
const { data: orders } = await useFetch('/api/drink')
const user = useState('user', () => '')

const isAvailable = (drinkType: DrinkType) =>
    statuses.value?.find((s: { drinkType: any }) => s.drinkType === drinkType)
        ?.available ?? true

const isOrdered = (drinkType: DrinkType) =>
    orders.value?.find((s: { drinkType: any }) => s.drinkType === drinkType)
        ?.user === user.value

let cocktails = rawCocktails.map((c) => ({
    ...c,
    available: isAvailable(c.type),
    ordered: isOrdered(c.type),
}))

let mocktails = rawMocktails.map((m) => ({
    ...m,
    available: isAvailable(m.type),
    ordered: isOrdered(m.type),
}))

const loading = ref(false)

const hasOrder = computed(() => {
    return [...cocktails, ...mocktails].some((c) => c.ordered)
})
const selectedDrink = ref<DrinkType | null>(null)
const selectDrink = (drinkType: DrinkType) => {
    if (hasOrder.value) {
        return confirm('Objednaný nápoj sa chystá. Musíš počkať.')
    }
    selectedDrink.value = drinkType
}

const orderDrink = async (drinkType: DrinkType) => {
    loading.value = true
    const drink: DrinkType =
        drinkType === DrinkType.RandomAlco ||
        drinkType === DrinkType.RandomNonAlco
            ? getRandomDrink()
            : drinkType

    const { error } = await useFetch('/api/drink', {
        method: 'POST',
        body: {
            type: drink,
            user: user.value,
        } as CreateDrinkOrderDTO,
    })
    if (!error.value) {
        cocktails = [
            ...cocktails.map((c) => {
                c.ordered = false
                if (c.type === drink) {
                    c.ordered = true
                }
                return c
            }),
        ]
        mocktails = [
            ...mocktails.map((m) => {
                m.ordered = false
                if (m.type === drink) {
                    m.ordered = true
                }
                return m
            }),
        ]
    }
    loading.value = false
    refs.value[drink].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    })
}

const getRandomDrink = (): DrinkType => {
    const drinkGroup =
        selectedDrink.value === DrinkType.RandomAlco ? cocktails : mocktails
    const values = drinkGroup.filter(
        (val) =>
            DrinkType[val.type] !== 'RandomAlco' &&
            DrinkType[val.type] !== 'RandomNonAlco' &&
            val.available
    )
    return values[Math.floor(Math.random() * values.length)].type
}
</script>
