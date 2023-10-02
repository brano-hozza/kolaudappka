<template>
    <ul v-if="!loading">
        <li v-for="game in games" :key="game.type">
            <button
                :class="{ selected: gameVote?.gameType === game.type }"
                @click="vote(game.type)"
            >
                {{ game.name }}
            </button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { GameVote } from '~/server/models'
import { GameType } from '~/types'

const name = ref('')
const gameVote = ref<GameVote | null>(null)
const loading = ref(false)
const games = [
    {
        name: 'Výbušné Koťátka',
        type: GameType.Kotatka,
    },
    {
        name: 'Cards against humanity',
        type: GameType.CardsAgainstHumanity,
    },
    {
        name: 'Bang',
        type: GameType.Bang,
    },
    {
        name: 'Shit Happens',
        type: GameType.ShitHappens,
    },
    {
        name: 'Uno Flip',
        type: GameType.UnoFlip,
    },
    {
        name: 'Krycie Mená',
        type: GameType.KrycieMena,
    },
    {
        name: 'Piškvorky',
        type: GameType.Piskvorky,
    },
    {
        name: 'Savana',
        type: GameType.Savana,
    },
    {
        name: 'Doodle Dungeon',
        type: GameType.DoodleDungeon,
    },
] as const
onMounted(async () => {
    name.value = localStorage.getItem('name') ?? ''
    const data = await $fetch(`/api/game/${name.value}`)
    gameVote.value = data
    loading.value = false
})

const vote = async (type: GameType) => {
    gameVote.value = { ...gameVote.value!, gameType: type }
    await useFetch(`/api/game`, {
        method: 'POST',
        body: JSON.stringify({ gameType: type, name: name.value }),
    })
}
</script>
<style>
button {
    color: white;
}
button.selected {
    color: blue;
}
</style>
