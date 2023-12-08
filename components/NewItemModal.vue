<template>
    <div
        class="w-3/4 mt-0 items-center flex flex-col bg-black fixed py-10 rounded-lg"
    >
        <!-- TODO: validation -->
        <div class="flex items-center w-full">
            <div class="w-20"></div>
            <p
                class="mx-auto font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
            >
                {{ title }}
            </p>

            <div class="mr-5">
                <CircleImageButton
                    icon="charm:cross"
                    icon-size="50%"
                    size="sm"
                    background-color="bg-pinky"
                    @click="$emit('close')"
                />
            </div>
        </div>
        <!-- TODO: validate the name - limit to two words -->
        <StyledInput
            v-model="name"
            type="text"
            :label="titleInputLabel"
            :placeholder="titleInputPlaceholder"
        />
        <StyledSelect
            v-model="firstTitleColor"
            :options="colors"
            :label="
                name.split(' ').length > 1
                    ? '*Farba prvého slova názvu'
                    : '*Farba názvu'
            "
        />
        <StyledSelect
            v-if="name.split(' ').length > 1"
            v-model="secondTitleColor"
            :options="colors"
            label="*Farba druhého slova názvu"
        />
        <StyledInput
            v-model="image"
            type="text"
            label="*Link na obrázok"
            placeholder="Link na obrázok"
        />
        <CircleImageButton
            icon="charm:tick"
            icon-size="50%"
            size="sm"
            background-color="bg-pinky"
            class="mt-10"
            @click="$emit('addItem', data)"
        />
    </div>
</template>

<script setup lang="ts">
import { titleCase } from '~/utils/utils'
import { NewItemData } from '~/types'
defineProps<{
    title: string
    titleInputLabel: string
    titleInputPlaceholder: string
}>()

defineEmits<{
    (e: 'addItem', data: NewItemData): void
    (e: 'close'): void
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
const firstTitleColor = ref(colors[0])
const secondTitleColor = ref(colors[0])
const data = computed<NewItemData>(() => ({
    imageUrl: image.value,
    titles:
        name.value.split(' ').length === 1
            ? [
                  {
                      text: titleCase(name.value),
                      color: firstTitleColor.value,
                  },
              ]
            : [
                  {
                      text: titleCase(name.value.split(' ')[0]),
                      color: firstTitleColor.value,
                  },
                  {
                      text: titleCase(name.value.split(' ')[1]),
                      color: secondTitleColor.value,
                  },
              ],
}))
</script>
