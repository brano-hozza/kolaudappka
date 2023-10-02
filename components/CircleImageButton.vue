<template>
    <div>
        <div
            class="w-80 h-80 rounded-full bg-black flex justify-center items-center mb-4"
        >
            <img
                class="mx-auto"
                :src="imageUrl"
                alt="image"
                @click="$emit('click')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
})
</script>
