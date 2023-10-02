<template>
    <div>
        <img src="/img/spotify.png" @click="openJam" />
    </div>
</template>

<script lang="ts" setup>
const openJam = () => {
    window.open('https://spotify.link/KoxTv1vGzDb', '_blank')
}
</script>
