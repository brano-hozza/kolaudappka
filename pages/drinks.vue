<template>
    <p class="font-basic font-glow-pink text-7xl my-10 text-center">
        Objednaj si drink!
    </p>
    <loader-component v-if="loading" />
    <div v-else class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="drink in drinks"
            :key="drink.type"
            class="flex flex-col items-center justify-between gap-8 my-4"
            :class="{
                'grayscale cursor-not-allowed': hasOrder && !drink.ordered,
            }"
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
                :selected="drink.ordered || selectedDrink === drink.type"
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
        <CircleImageButton
            v-if="!hasOrder && selectedDrink != undefined"
            floating
            icon="ri:shopping-basket-2-line"
            size="sm"
            background-color="bg-pinky"
            @click="orderDrink(selectedDrink)"
        />
    </div>
</template>

<script lang="ts" setup>
import { DrinkType } from '@/types'
import { CreateDrinkOrderDTO } from '~/types/dtos'

const { data: statuses } = await useFetch('/api/drink-status')
const { data: orders } = await useFetch('/api/drink')

const isAvailable = (drinkType: DrinkType) =>
    statuses.value?.find((s) => s.drinkType === drinkType)?.available ?? true

const isOrdered = (drinkType: DrinkType) =>
    orders.value?.find((s) => s.drinkType === drinkType)?.user ===
    localStorage.getItem('name')

onMounted(() => {
    drinks.value = drinks.value.map((drink) => {
        drink.available = isAvailable(drink.type)
        drink.ordered = isOrdered(drink.type)
        return drink
    })
})

type Title = {
    text: string
    color: string
}
type Drink = {
    type: DrinkType
    image: string
    titles: Title[]
    backgroundColor: string
    available?: boolean
    ordered?: boolean
}
const drinks = ref<Drink[]>([
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
        type: DrinkType.Random,
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
])

const loading = ref(false)

const hasOrder = computed(() => {
    return drinks.value.some((d) => d.ordered)
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
        drinkType === DrinkType.Random ? getRandomDrink() : drinkType

    const { error } = await useFetch('/api/drink', {
        method: 'POST',
        body: {
            type: drink,
            user: localStorage.getItem('name'),
        } as CreateDrinkOrderDTO,
    })
    if (!error.value) {
        drinks.value = [
            ...drinks.value.map((d) => {
                d.ordered = false
                if (d.type === drink) {
                    d.ordered = true
                }
                return d
            }),
        ]
    }
    loading.value = false
}

const getRandomDrink = (): DrinkType => {
    const values = drinks.value.filter(
        (val) => DrinkType[val.type] !== 'Random' && val.available
    )
    const drink = values[Math.floor(Math.random() * values.length)]
    return drink.type
}
</script>
