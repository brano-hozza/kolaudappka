<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <!-- TODO: validation -->
        <p
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Nová párty 🎉
        </p>
        <StyledInput
            v-model="organizerName"
            type="text"
            label="*Meno organizátora"
            placeholder="Meno / prezývka organizátora"
        />
        <StyledInput
            v-model="partyName"
            type="text"
            label="*Názov párty"
            placeholder="Názov párty"
        />
        <StyledInput
            v-model="partyDateTime"
            type="datetime-local"
            label="*Dátum a čas začiatku"
        />
        <StyledInput
            v-model="evalStartTime"
            type="time"
            label="*Spustenie hodnotenia"
        />
        <StyledInput
            v-model="jamLink"
            type="link"
            label="Spotify Jam link"
            placeholder="Vygenerovaný Spotify link"
        />
    </div>
    <div class="mt-10">
        <!-- TODO: add v-if="hasValidData" -->
        <CircleImageButton
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('nextPage')"
        />
    </div>
</template>

<script setup lang="ts">
defineEmits<{
    (e: 'nextPage'): void
}>()
// type FormData = {
//     organizerName: string
//     partyName: string
//     partyDateTime: string
//     evalStartTime: string
//     jamLink: string
// }

const organizerName = ref('')
const partyName = ref('')
const partyDateTime = ref('')
const evalStartTime = ref('')
const jamLink = ref('')

const hasValidData = computed(
    () =>
        !!(
            organizerName.value &&
            partyName.value &&
            partyDateTime.value &&
            evalStartTime.value
        )
)

// TODO: Save data to store
// const data = computed<FormData>(() => ({
//     organizerName: organizerName.value,
//     partyName: partyName.value,
//     partyDateTime: partyDateTime.value,
//     evalStartTime: evalStartTime.value,
//     jamLink: jamLink.value,
// }))
</script>
