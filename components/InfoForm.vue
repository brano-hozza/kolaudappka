<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <!-- TODO: validation -->
        <p
            ref="title"
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
        <CircleImageButton
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="$emit('click')"
        />
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])

const organizerName = ref('')
const partyName = ref('')
const partyDateTime = ref('')
const evalStartTime = ref('')
const jamLink = ref('')

// TODO: fix this - not reaactive
// const hasValidData = computed(() => {
//     console.log('HAS VALID DATA')
//     return (
//         organizerName.value &&
//         partyName.value &&
//         partyDateTime.value &&
//         evalStartTime.value
//     )
// })

// watch([organizerName, partyName, partyDateTime, evalStartTime], () => {
//     console.log('Input changed')
//     // Additional logic on input change if needed
// })
</script>
