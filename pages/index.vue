<template>
    <input v-model="name" placeholder="Zadaj meno" />
    <button :disabled="canContinue" @click="continueToMenu">Continue</button>
</template>

<script lang="ts" setup>
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
