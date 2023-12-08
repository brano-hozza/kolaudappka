<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <p
            ref="title"
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Menu hier 🎲
        </p>

        <div class="grid grid-cols-1 md:gap-x-10 md:grid-cols-4">
            <!-- Default games -->
            <div
                v-for="game in games"
                :key="game.type"
                :ref="(e) => (refs[game.type] = e as HTMLDivElement)"
                class="flex flex-col items-center justify-between"
            >
                <CircleImageButton
                    :image-url="game.image"
                    :background-color="game.backgroundColor"
                    :selected="selectedGames.includes(game.type)"
                    size="lg"
                    @click="selectGame(game.type)"
                >
                </CircleImageButton>
            </div>
            <!-- Add new game button -->
            <CircleImageButton
                icon="charm:plus"
                icon-size="30%"
                size="lg"
                background-color="bg-pinky"
                @click="addingGame = true"
            >
            </CircleImageButton>
        </div>
        <CircleImageButton
            v-if="selectedGames.length"
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('nextPage')"
        />
        <NewItemModal
            v-if="addingGame"
            :is-game="true"
            title="Nová hra"
            @add-item="addGame"
            @close="addingGame = false"
        />
    </div>
</template>

<script setup lang="ts">
import { rawGames } from '~/data/games'
import { NewItemData, GameType } from '~/types'

defineEmits<{
    (e: 'addItem'): void
    (e: 'close'): void
    (e: 'nextPage'): void
}>()

const games = ref(rawGames)

const refs = ref<Record<string, HTMLDivElement>>({})

const selectedGames = ref<GameType[]>([])
const selectGame = (gameType: GameType) => {
    if (selectedGames.value.includes(gameType)) {
        selectedGames.value = selectedGames.value.filter(
            (item) => item !== gameType
        )
    } else {
        selectedGames.value.push(gameType)
    }
}

const addingGame = ref(false)

const addGame = (gameData: NewItemData) => {
    const newGame = {
        // TODO: create new gameType based on title
        type: GameType.CustomGame,
        // TODO: image: drinkData.imageUrl,
        image: '/img/drinks/newdrink.png',
        backgroundColor: 'bg-black',
        // TODO: take from gameData
    }
    if (addingGame.value) {
        games.value.push(newGame)
        addingGame.value = false
    }
}
</script>
