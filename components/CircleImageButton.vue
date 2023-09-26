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
