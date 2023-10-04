<template>
    <p class="font-basic font-glow-dark-purple text-7xl my-20 text-center">
        Objednaj si drink!
    </p>
    <loader-component v-if="loading" />
    <div v-else class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="drink in drinks"
            :key="drink.type"
            class="flex flex-col items-center justify-between gap-4"
            :class="{
                'grayscale cursor-not-allowed':
                    !drink.available || (hasOrder && !drink.ordered),
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
                size="lg"
                @click="selectDrink(drink.type)"
            />
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
                color: 'green',
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
                color: 'yellow',
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
                color: 'green',
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
                color: 'light-gray',
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
                color: 'yellow',
            },
            {
                text: 'Prosecco',
                color: 'light-yellow',
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
                color: 'orange',
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
                color: 'white',
            },
            {
                text: 'Vino',
                color: 'light-gray',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.RedWine,
        image: '/img/drinks/redwine.png',
        titles: [
            {
                text: 'Cervene',
                color: 'red',
            },
            {
                text: 'Vino',
                color: 'light-red',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: DrinkType.Random,
        image: '/img/drinks/random.png',
        titles: [
            {
                text: 'Nahodne',
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
        return confirm('Už máš objednaný nápoj. Musis pockat')
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

const getRandomDrink = () => {
    const values = Object.keys(DrinkType).filter(
        (val) => val !== 'Random'
    ) as Array<keyof typeof DrinkType>
    const enumKey = values[Math.floor(Math.random() * values.length)]
    return DrinkType[enumKey]
}
</script>
