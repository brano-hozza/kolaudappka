<template>
    <div>
        <div class="circle-image-button">
            <img :src="imageURL" alt="image" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        imageURL: {
            type: String,
            required: true,
            default: '',
        },
    },
}
</script>
<style scoped lang="scss">
.circle-image-button {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    img {
        width: 150%;
        height: 150%;
    }
}
</style>
