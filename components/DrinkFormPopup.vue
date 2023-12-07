<template>
    <div
        class="w-3/4 items-center flex flex-col bg-black fixed px-10 py-10 rounded-lg"
    >
        <!-- TODO: validation -->
        <p
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Nový drink
        </p>
        <StyledInput
            v-model="name"
            type="text"
            label="*Názov drinku"
            placeholder="Názov drinku"
        />
        <StyledSelect
            v-model="titleColor"
            :options="colors"
            label="*Farba názvu"
        />
        <StyledInput
            v-model="image"
            type="text"
            label="*Link na obrázok"
            placeholder="Link na obrázok"
        />
        <CircleImageButton
            icon="charm:tick"
            icon-size="30%"
            size="sm"
            background-color="bg-pinky"
            class="mt-10"
            @click="$emit('addDrink', drinkData)"
        />
    </div>
</template>

<script setup lang="ts">
type DrinkData = {
    imageUrl: string
    titles: {
        text: string
        color: string
    }[]
}
defineEmits<{
    (e: 'addDrink', drinkData: DrinkData): void
}>()
const colors = [
    'white',
    'red',
    'orange',
    'light-orange',
    'peach',
    'salmon',
    'yellow',
    'light-yellow',
    'limoncello-yellow',
    'vibrant-yellow',
    'turquoise',
    'light-turguoise',
    ' light-green',
    'blue',
    'purple',
    'pink',
    'pink2',
    'blush-pink',
    'light-nude',
    'nude',
    'beige',
    'light-brown',
    'brown',
]
const name = ref('')
const image = ref('')
const titleColor = ref(colors[0])
const drinkData = computed<DrinkData>(() => ({
    imageUrl: image.value,
    titles: [
        {
            text: name.value,
            color: titleColor.value,
        },
    ],
}))
</script>
