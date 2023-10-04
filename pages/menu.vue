<template>
    <div
        class="w-full flex flex-col md:flex-row items-center md:justify-evenly md:items-stretch mt-10"
    >
        <div class="flex flex-col items-center">
            <img src="/img/titles/drinks.png" />
            <CircleImageButton
                image-url="/img/menu/drinks.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/drinks')"
            />
        </div>

        <div class="flex flex-col items-center">
            <img src="/img/titles/games.png" />
            <CircleImageButton
                image-url="/img/menu/games.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/games')"
            />
        </div>

        <div class="flex flex-col items-center">
            <img src="/img/titles/snacks.png" />
            <CircleImageButton
                image-url="/img/menu/snacks.png"
                background-color="bg-black"
                size="lg"
                @click="changeRoute('/snacks')"
            />
        </div>
    </div>
    <div
        class="w-full flex flex-col md:flex-row items-center md:justify-evenly md:items-stretch mt-10"
    >
        <div class="flex flex-col items-center">
            <img src="/img/titles/music.png" />
            <CircleImageButton
                image-url="/img/menu/music.png"
                background-color="bg-black"
                size="lg"
                @click="openJam"
            />
        </div>

        <div class="flex flex-col items-center">
            <img src="/img/titles/rating.png" />
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
    router.push(pathUrl)
}
const openJam = () => {
    window.open('https://spotify.link/KoxTv1vGzDb', '_blank')
}
</script>
