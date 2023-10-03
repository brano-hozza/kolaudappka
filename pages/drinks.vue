<template>
    <div class="grid gird-cols-1 md:gap-x-10 md:grid-cols-4 mt-10">
        <div
            v-for="drink in drinks"
            :key="drink.type"
            class="flex flex-col items-center justify-between"
            :class="{
                'grayscale cursor-not-allowed':
                    !drink.available || loading || (hasOrder && !drink.ordered),
            }"
        >
            <img :src="drink.title" />
            <CircleImageButton
                :image-url="drink.image"
                :selected="drink.ordered"
                @click="orderDrink(drink.type)"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DrinkType } from '@/types'

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
    available?: boolean
    ordered?: boolean
}
const drinks = ref<Drink[]>([
    {
        type: DrinkType.AperolSpritz,
        image: '/img/drinks/aperol.png',
        title: '/img/titles/aperol.png',
    },
    {
        type: DrinkType.Mojito,
        image: '/img/drinks/mojito.png',
        title: '/img/titles/mojito.png',
    },
    {
        type: DrinkType.Daiquiri,
        image: '/img/drinks/daiquiri.png',
        title: '/img/titles/daiquiri.png',
    },
    {
        type: DrinkType.HugoSpritz,
        image: '/img/drinks/hugospritz.png',
        title: '/img/titles/hugo.png',
    },
    {
        type: DrinkType.GinTonic,
        image: '/img/drinks/gintonic.png',
        title: '/img/titles/gin.png',
    },
    {
        type: DrinkType.WhiteWine,
        image: '/img/drinks/whitewine.png',
        title: '/img/titles/whitewine.png',
    },
    {
        type: DrinkType.RedWine,
        image: '/img/drinks/redwine.png',
        title: '/img/titles/redwine.png',
    },
    {
        type: DrinkType.Random,
        image: '/img/drinks/random.png',
        title: '/img/titles/random.png',
    },
])

const loading = ref(false)

const hasOrder = computed(() => {
    return drinks.value.some((d) => d.ordered)
})

const orderDrink = async (drinkType: DrinkType) => {
    if (loading.value) return
    if (hasOrder.value) {
        return confirm('Už máš objednaný nápoj. Musis pockat')
    }
    loading.value = true
    const drink: DrinkType =
        drinkType === DrinkType.Random ? getRandomDrink() : drinkType

    const { error } = await useFetch('/api/drink', {
        method: 'POST',
        body: {
            type: drink,
            name: localStorage.getItem('name'),
        },
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
