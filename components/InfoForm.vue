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
            v-model="startDateTime"
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
            v-if="hasValidData"
            floating
            icon="charm:arrow-right"
            size="sm"
            background-color="bg-pinky"
            @click="
                () => {
                    addParty()
                    $emit('nextPage')
                }
            "
        />
    </div>
</template>

<script setup lang="ts">
import { usePartyStore } from '~/stores/party'
import { useUserStore } from '~/stores/user'
defineEmits<{
    (e: 'nextPage'): void
}>()

const organizerName = ref('')
const partyName = ref('')
const startDateTime = ref('')
const evalStartTime = ref('')
const jamLink = ref('')

const hasValidData = computed(
    () =>
        !!(
            organizerName.value &&
            partyName.value &&
            startDateTime.value &&
            evalStartTime.value
        )
)

const partyStore = usePartyStore()
const userStore = useUserStore()
const addParty = () => {
    userStore.setName(organizerName.value)
    userStore.setIsAdmin(true)
    partyStore.setName(partyName.value)
    partyStore.setStartDateTime(new Date(startDateTime.value))
    partyStore.setEvalStartDateTime(
        parseTimeStringToDateTime(startDateTime.value, evalStartTime.value)
    )
    partyStore.setJamLink(jamLink.value)
    partyStore.setJamLink(jamLink.value)
}
</script>
