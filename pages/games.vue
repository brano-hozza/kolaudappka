<template>
    <div class="relative overflow-scroll scrollbar-hide h-[100vh]">
        <loader-component v-if="loading" />
        <div class="overflow-auto scrollbar-hide h-full">
            <p class="font-basic font-glow-pink text-7xl my-10 text-center">
                Zahlasuj<br />
                za hru!
            </p>
            <div class="grid grid-cols-1 gap-y-10 md:gap-x-10 md:grid-cols-4">
                <div
                    v-for="game in games"
                    :key="game.type"
                    class="flex flex-col items-center justify-between"
                >
                    <CircleImageButton
                        :image-url="game.image"
                        :img-size="game.imageSize"
                        :background-color="game.backgroundColor"
                        :selected="
                            selectedGame === game.type ||
                            votedGame === game.type
                        "
                        :selected-color="
                            votedGame === game.type ? 'green' : 'yellow'
                        "
                        size="lg"
                        @click="selectGame(game.type)"
                    />
                </div>
                <CircleImageButton
                    v-if="canSubmit"
                    floating
                    icon="ic:outline-how-to-vote"
                    size="sm"
                    background-color="bg-pinky"
                    @click="vote(selectedGame!)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { GameType, Game } from '~/types'
import { rawGames } from '~/data/games'
import { VoteForGameDTO } from '~/types/dtos'

const user = useState('user', () => '')
const loading = ref(false)
const games = ref<Game[]>(rawGames)

const votedGame = ref<GameType | null>(null)

const data = await $fetch(`/api/game/${user.value}`)
votedGame.value = data?.gameType ?? null

const selectedGame = ref<GameType | null>(null)
const changedVote = ref(false)
const selectGame = (gameType: GameType) => {
    if (selectedGame.value === gameType) {
        return
    }
    selectedGame.value = gameType
    changedVote.value = true
}
const vote = async (type: GameType) => {
    loading.value = true
    await useFetch(`/api/game`, {
        method: 'POST',
        body: { type, user: user.value } as VoteForGameDTO,
    })
    selectedGame.value = null
    votedGame.value = type
    loading.value = false
}

const canSubmit = computed(
    () => selectedGame.value !== null && selectedGame.value !== votedGame.value
)
</script>
<style>
button {
    color: white;
}
button.selected {
    color: blue;
}
</style>
