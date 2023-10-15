<template>
    <div
        class="w-full flex flex-col md:flex-row items-center md:justify-evenly md:items-stretch mt-10"
    >
        <div class="flex flex-col items-center gap-4">
            <p class="font-basic font-glow-blue text-7xl">Drinky</p>
            <CircleImageButton
                image-url="/img/menu/drinks.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/drinks')"
            />
        </div>

        <div class="flex flex-col items-center gap-4">
            <p class="font-basic font-glow-yellow text-7xl">Hry</p>
            <CircleImageButton
                image-url="/img/menu/games.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/games')"
            />
        </div>

        <div class="flex flex-col items-center gap-4">
            <p class="font-basic font-glow-turquoise text-7xl">Sneky</p>
            <CircleImageButton
                image-url="/img/menu/snacks.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/snacks')"
            />
        </div>
    </div>
    <div
        class="w-full flex flex-col md:flex-row items-center md:justify-evenly md:items-stretch"
    >
        <div class="flex flex-col items-center gap-4">
            <p class="font-basic font-glow-red text-7xl">Hudba</p>
            <CircleImageButton
                image-url="/img/menu/music.png"
                background-color="bg-black"
                size="lg"
                @click="openJam"
            />
        </div>

        <div class="flex flex-col items-center gap-4">
            <p class="font-basic font-glow-purple text-7xl">Hodnotenie</p>
            <CircleImageButton
                image-url="/img/menu/rating.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/rating')"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
const router = useRouter()
const changeRoute = (pathUrl: string) => {
    if (pathUrl === '/rating' && !isRatingOpen.value)
        return confirm('Hodnotenie bude spustené o 23:00.')
    router.push(pathUrl)
}
const openJam = () => {
    window.open('https://spotify.link/F93jQGv4UDb', '_blank')
}
const isRatingOpen = computed(() => {
    const now = new Date()
    const ratingStart = new Date('2023-10-14T23:00:00')
    return now > ratingStart
})
</script>
