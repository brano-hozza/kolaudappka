<template>
    <div class="container">
        <div class="row">
            <CircleImageButton :imageURL="'/img/drinks.svg'" />
            <CircleImageButton :imageURL="'/img/games.svg'" />
            <CircleImageButton :imageURL="'/img/snacks.svg'" />
        </div>
        <div class="row">
            <CircleImageButton :imageURL="'/img/music.svg'" />
            <CircleImageButton :imageURL="'/img/rating.svg'" />
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
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>
