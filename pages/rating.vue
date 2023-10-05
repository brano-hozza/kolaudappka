<template>
    <div class="relative overflow-scroll h-[100vh]">
        <loader-component v-if="loading" />
        <div class="overflow-auto h-full">
            <p class="font-basic font-glow-pink text-center text-7xl my-10">
                Čo môžeme<br />
                zlepšiť?
            </p>
            <div>
                <div class="grid grid-cols-5 mx-4 gap-1">
                    <div
                        v-for="star in [1, 2, 3, 4, 5]"
                        :key="star"
                        @click="selectStar(star)"
                    >
                        <img :src="getImage(selectedStar >= star)" />
                    </div>
                </div>
                <div class="w-full flex items-center justify-center mt-10">
                    <textarea
                        v-model="message"
                        placeholder="Aspoň 5 slovíčok, v dobrom či v zlom 🥺👉🏻👈🏻"
                        class="w-full h-32 p-4 border-2 border-pinky rounded-xl mx-4"
                        :disabled="alreadyVoted"
                    ></textarea>
                </div>
                <CircleImageButton
                    v-if="isRatingComplete && !alreadyVoted"
                    floating
                    icon="ic:outline-how-to-vote"
                    size="sm"
                    background-color="bg-pinky"
                    @click="vote"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RateDTO } from '~/types/dtos'
const message = ref('')
const name = ref('')
const loading = ref(false)
const alreadyVoted = ref(false)
const selectedStar = ref(0)
onMounted(async () => {
    name.value = localStorage.getItem('name') ?? ''
    const data = await $fetch(`/api/rating/${name.value}`)
    if (data) {
        selectedStar.value = data.stars
        message.value = data.text
        alreadyVoted.value = true
    }
    loading.value = false
})
const getImage = (isFilled: boolean) =>
    isFilled ? '/img/rating/star_full.png' : '/img/rating/star_blank.png'
const selectStar = (star: number) => {
    if (alreadyVoted.value) return
    selectedStar.value = star
}
const isRatingComplete = computed(() => {
    return (
        selectedStar.value &&
        message.value
            .trim()
            .split(' ')
            .filter((x) => x.length).length >= 5
    )
})
const vote = async () => {
    loading.value = true
    await useFetch(`/api/rating`, {
        method: 'POST',
        body: {
            user: name.value,
            stars: selectedStar.value,
            text: message.value,
        } as RateDTO,
    })
    alreadyVoted.value = true
    loading.value = false
}
</script>
