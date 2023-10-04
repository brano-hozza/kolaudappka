<template>
    <img src="/img/titles/order.png" />
    <loader-component v-if="loading" />
    <div v-else class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="drink in drinks"
            :key="drink.type"
            class="flex flex-col items-center justify-between"
            :class="{
                'grayscale cursor-not-allowed':
                    !drink.available || (hasOrder && !drink.ordered),
            }"
        >
            <img :src="drink.title" />
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
            background-color="bg-green-500"
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
type Drink = {
    type: DrinkType
    image: string
    title: string
    backgroundColor: string
    available?: boolean
    ordered?: boolean
}
const drinks = ref<Drink[]>([
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
    const values = Object.keys(DrinkType) as Array<keyof typeof DrinkType>
    let enumKey = values[Math.floor(Math.random() * values.length)]
    while (enumKey === 'Random')
        enumKey = values[Math.floor(Math.random() * values.length)]
    return DrinkType[enumKey]
}
</script>
