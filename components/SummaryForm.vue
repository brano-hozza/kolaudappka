<template>
    <div class="w-full mt-10 items-center flex flex-col">
        <!-- TODO: validation -->
        <p
            class="font-basic text-center font-glow-pink mb-5 text-6xl md:text-8xl"
        >
            Zhrnutie
        </p>
        <!-- TODO: add summary of all the forms -->
        <!-- TODO: validate if the code is unique -->
        <StyledInput
            v-model="partyCode"
            type="text"
            label="*Heslo pre hostí"
            placeholder="Napr. UZASNA-PARTY"
        />
        <RectangleButton
            text="Vytvoriť párty"
            @click="$emit('showAdminPage')"
        />
    </div>
</template>

<script setup lang="ts">
const partyCode = ref('')
defineEmits<{
    (e: 'showAdminPage'): void
}>()
</script>
