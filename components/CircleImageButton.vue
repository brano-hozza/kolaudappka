<template>
    <div>
        <div class="circle-image-button">
            <img :src="props.imageUrl" alt="image" @click="changeRoute" />
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({
    imageUrl: {
        type: String,
        required: true,
    },
    pathUrl: {
        type: String,
        required: true,
    },
})
const changeRoute = () => {
    router.push(props.pathUrl)
}
</script>
<style lang="scss" scoped>
.circle-image-button {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background-color: #000000;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    cursor: pointer;
    img {
        width: 200%;
        height: 200%;
    }
}
</style>
