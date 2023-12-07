<template>
    <div class="flex flex-col w-3/4 mt-5 md:w-1/2">
        <label class="font-glow-xs-white bold mb-5 text-3xl">{{ label }}</label>
        <select
            class="p-5 rounded-lg text-white bg-gray-900 outline-pink-500"
            @change="
                $emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                )
            "
        >
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineEmits(['update:modelValue'])
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    options: {
        type: Array as PropType<string[]>,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
})
</script>
