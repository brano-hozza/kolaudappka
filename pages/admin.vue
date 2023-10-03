<template>
    <h1 class="text-white text-xl my-2">Admin panel</h1>
    <div class="flex flex-col md:flex-row justify-evenly w-1/2 md:w-full">
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Drinks</h2>
            <button
                class="text-white border-white border-2"
                @click="clearAll(EntityType.DrinkOrder)"
            >
                Clear all
            </button>
            <ul>
                <li
                    v-for="drink in drinks"
                    :key="drink.id"
                    :class="{ 'line-through': drink.resolved }"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    {{ drink.drinkType }} [{{ drink.user }}]
                    <button
                        v-if="!drink.resolved"
                        @click="
                            () => resolveOrder(EntityType.DrinkOrder, drink.id)
                        "
                    >
                        x
                    </button>
                </li>
            </ul>
        </div>
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Snacks</h2>
            <button
                class="text-white border-white border-2"
                @click="clearAll(EntityType.Snack)"
            >
                Clear all
            </button>
            <ul>
                <li
                    v-for="snack in snacks"
                    :key="snack.id"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    Snack [{{ snack.user }}]
                </li>
            </ul>
        </div>
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Games</h2>
            <button
                class="text-white border-white border-2"
                @click="finishVoting"
            >
                Finish voting
            </button>
            <ul>
                <li
                    v-for="(value, key) in countedGameVotes"
                    :key="key"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    {{ getGameName(Number(key)) }} [{{ value }} votes]
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EntityType, GameType } from '~/types'

// Load drinks
const { data: drinks, refresh: refreshDrinks } = await useFetch('/api/drink', {
    lazy: true,
    server: false,
})

drinks.value?.sort((a) => (a.resolved ? 1 : -1))
// Load snacks
const { data: snacks, refresh: refreshSnacks } = await useFetch('/api/snack', {
    lazy: true,
    server: false,
})
// Load game votes
const { data: gameVotes, refresh: refreshGameVotes } = await useFetch(
    '/api/game',
    {
        lazy: true,
        server: false,
    }
)

const countedGameVotes = computed(
    () =>
        gameVotes.value?.reduce(
            (acc, curr) => {
                if (acc[curr.gameType]) {
                    acc[curr.gameType]++
                } else {
                    acc[curr.gameType] = 1
                }
                return acc
            },
            {} as Record<GameType, number>
        )
)

const resolveOrder = async (entityType: EntityType, id: number) => {
    await useFetch(`/api/${entityType}/${id}`, {
        method: 'DELETE',
    })
    await refreshDrinks()
}

const getGameName = (gameType: GameType) => {
    switch (gameType) {
        case GameType.Bang:
            return 'Bang'
        case GameType.CardsAgainstHumanity:
            return 'Cards Against Humanity'
        case GameType.DoodleDungeon:
            return 'Doodle Dungeon'
        case GameType.Kotatka:
            return 'Kotatka'
        case GameType.KrycieMena:
            return 'Krycie mena'
        case GameType.Piskvorky:
            return 'Piškvorky'
        case GameType.Savana:
            return 'Savana'
        case GameType.ShitHappens:
            return 'Shit happens'
        case GameType.UnoFlip:
            return 'Uno Flip'
        default:
            return 'Unknown game'
    }
}

const finishVoting = async () => {
    await useFetch(`/api/game`, {
        method: 'DELETE',
    })
    await refreshGameVotes()
}

const clearAll = async (entityType: EntityType) => {
    await useFetch(`/api/${entityType}`, {
        method: 'DELETE',
    })
    if (entityType === EntityType.Snack) await refreshSnacks()
    if (entityType === EntityType.DrinkOrder) await refreshDrinks()
}
</script>
