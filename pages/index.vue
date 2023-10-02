<template>
    <div class="w-full h-screen flex flex-col justify-center items-center">
        <div
            class="bg-opacity-20 bg-white w-full md:w-1/2 h-1/2 flex flex-col justify-center items-center p-2 rounded-md"
        >
            <h1 class="text-4xl text-white mb-4">Hello</h1>
            <pretty-input @change="name = $event" />
            <button
                class="w-full md:w-1/2 p-2 bg-white m-4 cursor-pointer rounded"
                :disabled="canContinue"
                @click="continueToMenu"
            >
                Pokračovať
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import PrettyInput from '@/components/PrettyInput.vue'
definePageMeta({
    layout: false,
})
const name = ref('')
onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    if (name.value) continueToMenu()
})

const canContinue = computed(() => name.value.length < 3)
const router = useRouter()
const continueToMenu = () => {
    if (canContinue.value) return
    localStorage.setItem('name', name.value)
    router.push('/menu')
}
</script>
