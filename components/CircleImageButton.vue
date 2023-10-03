<template>
    <div>
        <div
            class="w-80 h-80 rounded-full flex justify-center items-center mb-4"
            :class="{
                [backgroundColor]: true,
                'border-4 border-green-500': props.selected,
            }"
        >
            <img
                class="mx-auto"
                :src="props.imageUrl"
                alt="image"
                @click="$emit('click')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
const props = defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
    selected: {
        type: Boolean,
        default: false,
    },
})
const backgroundColor = computed(() =>
    props.imageUrl === '/img/drinks/random.png' ? 'bg-white' : 'bg-black'
)
</script>
