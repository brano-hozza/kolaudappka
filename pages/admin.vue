<template>
    <h1 class="text-white text-xl my-2">Admin panel</h1>
    <div class="flex flex-col md:flex-row justify-evenly w-1/2 md:w-full">
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Drinks</h2>
            <ul v-if="!pending">
                <li
                    v-for="drink in drinks?.sort((a) => (a.resolved ? 1 : -1))"
                    :key="drink.id"
                    :class="{ 'line-through': drink.resolved }"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    {{ drink.drinkType }} [{{ drink.name }}]
                    <button
                        v-if="!drink.resolved"
                        @click="resolveOrder(EntityType.Drink, drink.id)"
                    >
                        x
                    </button>
                </li>
            </ul>
        </div>
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Food</h2>
            <ul v-if="!pending">
                <li
                    v-for="drink in drinks"
                    :key="drink.id"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    {{ drink.drinkType }} [{{ drink.name }}]
                </li>
            </ul>
        </div>
        <div
            class="flex flex-col content-start w-full md:w-1/4 mb-2 bg-white bg-opacity-10"
        >
            <h2 class="text-white text-center">Games</h2>
            <ul v-if="!pending">
                <li
                    v-for="drink in drinks"
                    :key="drink.id"
                    class="text-white border-white border-opacity-20 border-t-2"
                >
                    {{ drink.drinkType }} [{{ drink.name }}]
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EntityType } from '~/types'

const { data: drinks, pending, refresh } = await useFetch('/api/drink')

const resolveOrder = async (entityType: EntityType, id: number) => {
    await useFetch(`/api/${entityType}/${id}`, {
        method: 'DELETE',
    })
    await refresh()
}
</script>
