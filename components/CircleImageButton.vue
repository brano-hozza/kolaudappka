<template>
    <div
        class="rounded-full flex justify-center items-center mb-4 cursor-pointer overflow-hidden"
        :class="{
            [backgroundColor]: true,
            [`border-4 ${getBorderColor(selectedColor)}`]: selected,
            'fixed right-5 bottom-5': floating,
            relative: !floating,
            [getSizeClass(size)]: true,
            'opacity-50 cursor-not-allowed': disabled,
        }"
        @click="$emit('click')"
    >
        <NuxtImg v-if="!icon" sizes="200px" :src="imageUrl" alt="image" />
        <Icon v-else size="80%" :name="icon" :color="iconColor" />
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps({
    imageUrl: {
        type: String,
        default: null,
    },
    backgroundColor: {
        type: String,
        default: 'bg-transparent',
    },
    selected: {
        type: Boolean,
        default: false,
    },
    selectedColor: {
        type: String as PropType<'green' | 'yellow'>,
        default: 'green',
    },
    floating: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: null,
    },
    iconColor: {
        type: String,
        default: 'white',
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const getBorderColor = (color: 'green' | 'yellow') => {
    switch (color) {
        case 'green':
            return 'border-green-500'
        case 'yellow':
            return 'border-yellow-500'
    }
}

const getSizeClass = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        case 'sm':
            return 'w-20 h-20'
        case 'md':
            return 'w-40 h-40'
        case 'lg':
            return 'w-80 h-80'
    }
}
</script>
