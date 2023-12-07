<template>
    <div
        class="bg-pinky px-10 py-10 rounded-lg text-2xl text-white h-5 mt-10 justify-center items-center flex"
    >
        {{ text }}
    </div>
</template>
<script setup lang="ts">
defineProps({
    text: {
        type: String,
        default: 'default text',
    },
})
</script>
