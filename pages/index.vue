<!-- First screen - user picks if he wants to create a new party or join existing one -->
<template>
    <div class="w-full mt-10 items-center md:flex md:flex-col">
        <p
            class="font-basic text-center font-glow-pink text-6xl mb-10 md:mb-0 md:text-8xl"
        >
            Kolaudappka🎉
        </p>
        <div
            class="h-screen flex flex-col md:flex-row items-center gap-10 md:gap-20"
        >
            <div class="flex flex-col items-center gap-4">
                <p
                    class="font-basic font-glow-light-turguoise text-7xl text-center"
                >
                    Vytvoriť <br />
                    párty
                </p>
                <CircleImageButton
                    image-url="/img/create.png"
                    background-color="bg-black"
                    size="lg"
                    @click="changeRoute('/create')"
                >
                </CircleImageButton>
            </div>
            <div class="flex flex-col items-center gap-4">
                <p class="font-basic font-glow-pink2 text-7xl text-center">
                    Pripojiť sa <br />
                    k párty
                </p>
                <CircleImageButton
                    image-url="/img/join.png"
                    background-color="bg-black"
                    size="lg"
                    @click="changeRoute('/join')"
                >
                </CircleImageButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
definePageMeta({
    layout: false,
})
const changeRoute = (pathUrl: string) => {
    router.push(pathUrl)
}
</script>
