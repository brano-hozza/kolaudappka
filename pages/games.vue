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
import { GameType } from '~/types'
import { VoteForGameDTO } from '~/types/dtos'

const user = useState('user', () => '')
const loading = ref(false)

type Game = {
    name: string
    type: GameType
    image: string
    backgroundColor: string
    imageSize?: string
}
const games = ref<Game[]>([
    {
        name: 'Výbušné Koťátka',
        type: GameType.Kotatka,
        image: '/img/games/kotatka.png',
        backgroundColor: 'bg-white',
        imageSize: '100',
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
])
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
