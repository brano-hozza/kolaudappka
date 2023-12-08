<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <p
            ref="title"
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Menu snekov 🍿
        </p>
        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <!-- Default snacks -->
            <div
                v-for="snack in snacks"
                :key="snack.type"
                :ref="(e) => (refs[snack.type] = e as HTMLDivElement)"
                class="flex flex-col items-center justify-between gap-8 my-4"
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
                    :selected="selectedSnacks.includes(snack.type)"
                    size="lg"
                    @click="selectSnack(snack.type)"
                >
                </CircleImageButton>
            </div>
            <!-- Add snack button -->
            <div class="flex flex-col items-center justify-between gap-8 my-4">
                <span class="flex flex-col justify-center items-center gap-4"
                    ><p class="font-basic text-7xl font-glow-white">
                        Nový <br />Snek
                    </p></span
                >
                <CircleImageButton
                    icon="charm:plus"
                    icon-size="30%"
                    size="lg"
                    background-color="bg-pinky"
                    @click="addingSnack = true"
                >
                </CircleImageButton>
            </div>
        </div>
        <CircleImageButton
            v-if="selectedSnacks.length"
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('nextPage')"
        />
        <NewItemModal
            v-if="addingSnack"
            title="Nový snek"
            title-input-label="*Názov sneku"
            title-input-placeholder="Názov sneku"
            @add-item="addSnack"
            @close="addingSnack = false"
        />
    </div>
</template>

<script setup lang="ts">
import { rawSnacks } from '~/data/snacks'
import { NewItemData, SnackType } from '~/types'

defineEmits<{
    (e: 'addDrink'): void
    (e: 'close'): void
    (e: 'nextPage'): void
}>()

const snacks = ref(rawSnacks)

const refs = ref<Record<string, HTMLDivElement>>({})

const selectedSnacks = ref<SnackType[]>([])
const selectSnack = (snackType: SnackType) => {
    if (selectedSnacks.value.includes(snackType)) {
        selectedSnacks.value = selectedSnacks.value.filter(
            (item) => item !== snackType
        )
    } else {
        selectedSnacks.value.push(snackType)
    }
}

const addingSnack = ref(false)

const addSnack = (snackData: NewItemData) => {
    const newSnack = {
        type: SnackType.CustomSnack,
        // TODO: image: drinkData.imageUrl,
        image: '/img/drinks/newdrink.png',
        titles: snackData.titles,
        backgroundColor: 'bg-black',
    }
    if (addingSnack.value) {
        snacks.value.push(newSnack)
        addingSnack.value = false
    }
}
</script>
