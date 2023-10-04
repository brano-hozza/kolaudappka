<template>
    <p class="font-basic font-glow-dark-purple text-center text-7xl my-20">
        Nieco ti na<br />
        stole chyba?
    </p>
    <loader-component v-if="loading" />
    <div v-else class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="snack in snacks"
            :key="snack.type"
            class="flex flex-col items-center justify-between gap-4"
            :class="{
                'grayscale cursor-not-allowed':
                    !snack.available || (hasOrder && !snack.ordered),
            }"
        >
            <span class="flex flex-col justify-center items-center gap-4">
                <p
                    v-for="title in snack.titles"
                    :key="title.text"
                    class="font-basic text-7xl"
                    :class="[`font-glow-${title.color}`]"
                >
                    {{ title.text }}
                </p>
            </span>
            <CircleImageButton
                :image-url="snack.image"
                :background-color="snack.backgroundColor"
                :selected="snack.ordered || selectedSnack === snack.type"
                size="lg"
                @click="selectSnack(snack.type)"
            />
        </div>
        <CircleImageButton
            v-if="!hasOrder && selectedSnack != undefined"
            floating
            icon="ri:shopping-basket-2-line"
            size="sm"
            background-color="bg-pinky"
            @click="orderSnack(selectedSnack)"
        />
    </div>
</template>

<script lang="ts" setup>
import { SnackType } from '@/types'
import { CreateSnackOrderDTO } from '~/types/dtos'

const { data: statuses } = await useFetch('/api/snack-status')
const { data: orders } = await useFetch('/api/snack')

const isAvailable = (snackType: SnackType) =>
    statuses.value?.find((s) => s.snackType === snackType)?.available ?? true

const isOrdered = (snackType: SnackType) =>
    orders.value?.find((s) => s.snackType === snackType)?.user ===
    localStorage.getItem('name')

onMounted(() => {
    snacks.value = snacks.value.map((snack) => {
        snack.available = isAvailable(snack.type)
        snack.ordered = isOrdered(snack.type)
        return snack
    })
})

type Title = {
    text: string
    color: string
}

type Snack = {
    type: SnackType
    image: string
    titles: Title[]
    backgroundColor: string
    available?: boolean
    ordered?: boolean
}
const snacks = ref<Snack[]>([
    {
        type: SnackType.Sushi,
        image: '/img/snacks/sushi.png',
        titles: [
            {
                text: 'Sushi',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Chips,
        image: '/img/snacks/chips.png',
        titles: [
            {
                text: 'Cipsiky',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Nachos,
        image: '/img/snacks/nachos.png',
        titles: [
            {
                text: 'Nachosky',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Peanuts,
        image: '/img/snacks/peanuts.png',
        titles: [
            {
                text: 'Oriesky',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Macarons,
        image: '/img/snacks/macarons.png',
        titles: [
            {
                text: 'Makronky',
                color: 'red',
            },
        ],
        backgroundColor: 'bg-black',
    },
])

const loading = ref(false)

const hasOrder = computed(() => {
    return snacks.value.some((s) => s.ordered)
})

const selectedSnack = ref<SnackType | null>(null)
const selectSnack = (snackType: SnackType) => {
    if (hasOrder.value) {
        return confirm('Objednaný snack sa chystá. Musíš počkať.')
    }
    selectedSnack.value = snackType
}

const orderSnack = async (snackType: SnackType) => {
    loading.value = true
    const snack: SnackType = snackType

    const { error } = await useFetch('/api/snack', {
        method: 'POST',
        body: {
            type: snack,
            user: localStorage.getItem('name'),
        } as CreateSnackOrderDTO,
    })
    if (!error.value) {
        snacks.value = [
            ...snacks.value.map((s) => {
                s.ordered = false
                if (s.type === snack) {
                    s.ordered = true
                }
                return s
            }),
        ]
    }
    loading.value = false
}
</script>
