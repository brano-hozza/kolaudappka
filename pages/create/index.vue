<template>
    <!-- If current page index is 0, show PartyForm, else show Drinks form -->
    <div v-if="currentForm === PartyFormType.Info">
        <InfoForm @click="showNextPage" />
    </div>
    <div v-else-if="currentForm === PartyFormType.Drinks">
        <DrinksForm />
    </div>
</template>

<script setup lang="ts">
import InfoForm from './InfoForm.vue'
import DrinksForm from './DrinksForm.vue'
import { PartyFormType } from '@/types'
definePageMeta({
    layout: false,
})

const currentForm = ref(PartyFormType.Info)

const showNextPage = () => {
    currentForm.value === PartyFormType.Info
        ? (currentForm.value = PartyFormType.Drinks)
        : (currentForm.value = PartyFormType.Info)
}
</script>
