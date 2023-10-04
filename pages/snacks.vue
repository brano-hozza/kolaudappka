<template>
    <div class="flex justify-center items-center">
        <img src="/img/titles/snack.png" />
    </div>
    <loader-component v-if="loading" />
    <div v-else class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="snack in snacks"
            :key="snack.type"
            class="flex flex-col items-center justify-between"
            :class="{
                'grayscale cursor-not-allowed':
                    !snack.available || (hasOrder && !snack.ordered),
            }"
        >
            <img :src="snack.title" />
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
type Snack = {
    type: SnackType
    image: string
    title: string
    backgroundColor: string
    available?: boolean
    ordered?: boolean
}
const snacks = ref<Snack[]>([
    {
        type: SnackType.Sushi,
        image: '/img/snacks/sushi.png',
        title: '/img/titles/sushi.png',
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Chips,
        image: '/img/snacks/chips.png',
        title: '/img/titles/chips.png',
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Nachos,
        image: '/img/snacks/nachos.png',
        title: '/img/titles/nachos.png',
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Peanuts,
        image: '/img/snacks/peanuts.png',
        title: '/img/titles/peanuts.png',
        backgroundColor: 'bg-black',
    },
    {
        type: SnackType.Macarons,
        image: '/img/snacks/macarons.png',
        title: '/img/titles/macarons.png',
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
