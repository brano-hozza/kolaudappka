import Games from './games.vue';
<template>
    <div class="container">
        <div class="row">
            <CircleImageButton
                :image-url="'/img/drinks.svg'"
                :path-url="'/drinks'"
            />
            <CircleImageButton
                :image-url="'/img/games.svg'"
                :path-url="'/games'"
            />
            <CircleImageButton
                :image-url="'/img/snacks.svg'"
                :path-url="'/snacks'"
            />
        </div>
        <div class="row">
            <CircleImageButton
                :image-url="'/img/music.svg'"
                :path-url="'/music'"
            />
            <CircleImageButton
                :image-url="'/img/rating.svg'"
                :path-url="'/rating'"
            />
        </div>
    </div>
    <NuxtLink to="/drinks">Drinks</NuxtLink>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .row {
        display: flex;
        gap: 10rem;
        align-items: center;
    }
}
</style>
