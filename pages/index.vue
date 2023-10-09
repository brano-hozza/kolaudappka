<template>
    <div
        class="w-full h-screen flex flex-col justify-center items-center gap-4"
    >
        <p class="font-basic font-glow-pink text-6xl">Kolaudappka🎉</p>
        <div
            class="w-3/4 md: md:w-1/2 flex flex-col justify-center items-center p-2"
        >
            <pretty-input @change="user = $event" />
            <button
                class="w-full md:w-1/2 rounded p-1 m-4 text-white"
                :class="buttonBorderColor"
                :disabled="canContinue"
                @click="continueToMenu"
            >
                START
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import PrettyInput from '@/components/PrettyInput.vue'
definePageMeta({
    layout: false,
})

const user = useState<string>('user', () => '')
onMounted(() => {
    user.value = localStorage.getItem('name') || ''
    if (user.value) continueToMenu()
})

const canContinue = computed(() => user.value.length < 3)
const buttonBorderColor = computed(() =>
    canContinue.value
        ? 'border-2 border-black bg-gray-500 opacity-30 cursor-not-allowed'
        : 'border-2 border-pinky bg-black cursor-pointer'
)
const router = useRouter()
const continueToMenu = () => {
    if (canContinue.value) return
    localStorage.setItem('name', user.value)
    router.push('/menu')
}
</script>
