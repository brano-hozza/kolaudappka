<template>
    <img src="/img/titles/vote.png" />
    <div class="grid grid-cols-1 gap-y-10 md:gap-x-10 md:grid-cols-4">
        <div
            v-for="game in games"
            :key="game.type"
            class="flex flex-col items-center justify-between"
        >
            <CircleImageButton
                :image-url="game.image"
                :background-color="game.backgroundColor"
                :selected="gameVote?.gameType === game.type"
                @click="vote(game.type)"
            />
        </div>
    </div>
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
        image: '/img/games/kotatka.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Cards against humanity',
        type: GameType.CardsAgainstHumanity,
        image: '/img/games/cards.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Bang',
        type: GameType.Bang,
        image: '/img/games/bang.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Shit Happens',
        type: GameType.ShitHappens,
        image: '/img/games/shithappens.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Uno Flip',
        type: GameType.UnoFlip,
        image: '/img/games/unoflip.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Krycie Mená',
        type: GameType.KrycieMena,
        image: '/img/games/kryciemena.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Piškvorky',
        type: GameType.Piskvorky,
        image: '/img/games/piskvorky.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Savana',
        type: GameType.Savana,
        image: '/img/games/savana.png',
        backgroundColor: 'bg-white',
    },
    {
        name: 'Doodle Dungeon',
        type: GameType.DoodleDungeon,
        image: '/img/games/doodle.png',
        backgroundColor: 'bg-white',
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
