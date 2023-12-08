<template>
    <!-- If current page index is 0, show PartyForm, else show Drinks form -->
    <div v-if="currentForm === PartyFormType.Info">
        <InfoForm @next-page="showNextPage" />
    </div>
    <div v-else-if="currentForm === PartyFormType.Drinks">
        <DrinksForm @next-page="showNextPage" />
    </div>
    <div v-else-if="currentForm === PartyFormType.Snacks">
        <SnacksForm @next-page="showNextPage" />
    </div>
    <div v-else-if="currentForm === PartyFormType.Games">
        <GamesForm />
    </div>
    <div v-else-if="currentForm === PartyFormType.Summary">
        <SummaryForm />
    </div>
</template>

<script setup lang="ts">
import { PartyFormType } from '@/types'
definePageMeta({
    layout: false,
})

const currentForm = ref<PartyFormType>(PartyFormType.Info)
const currentPageIndex = computed(() =>
    Object.values(PartyFormType).indexOf(currentForm.value)
)

const showNextPage = () => {
    currentForm.value = Object.values(PartyFormType)[
        currentPageIndex.value + 1
    ] as PartyFormType
}
</script>
