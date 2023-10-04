<template>
    <div class="w-full h-screen flex flex-col justify-center items-center">
        <img src="/img/titles/kolaudappka.png" />
        <div
            class="w-3/4 md: md:w-1/2 flex flex-col justify-center items-center p-2"
        >
            <pretty-input @change="name = $event" />
            <button
                class="w-full md:w-1/2 rounded p-1 m-4 text-white"
                :class="buttonBorderColor"
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
const buttonBorderColor = computed(() =>
    canContinue.value
        ? 'border-2 border-black bg-gray-500 opacity-30 cursor-not-allowed'
        : 'border-2 border-[#F752E0] bg-black cursor-pointer'
)
const router = useRouter()
const continueToMenu = () => {
    if (canContinue.value) return
    localStorage.setItem('name', name.value)
    router.push('/menu')
}
</script>
