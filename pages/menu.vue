<template>
    <div class="flex flex-col items-center mt-10">
        <img src="/img/titles/drinks.png" />
        <CircleImageButton
            :image-url="'/img/menu/drinks.png'"
            @click="changeRoute('/drinks')"
        />
        <img src="/img/titles/games.png" />
        <CircleImageButton
            :image-url="'/img/menu/games.png'"
            @click="changeRoute('/games')"
        />
        <img src="/img/titles/snacks.png" />
        <CircleImageButton
            :image-url="'/img/menu/snacks.png'"
            @click="changeRoute('/snacks')"
        />
        <img src="/img/titles/music.png" />
        <CircleImageButton
            :image-url="'/img/menu/music.png'"
            @click="changeRoute('/music')"
        />
        <img src="/img/titles/rating.png" />
        <CircleImageButton
            :image-url="'/img/menu/rating.png'"
            @click="changeRoute('/rating')"
        />
    </div>
    <NuxtLink to="/drinks">Drinks</NuxtLink>
</template>
<script setup lang="ts">
const router = useRouter()
const changeRoute = (pathUrl: string) => {
    router.push(pathUrl)
}
</script>
