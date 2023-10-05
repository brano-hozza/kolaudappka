<template>
    <div
        :class="{
            'w-full h-[100%] absolute flex justify-center items-center bg-black opacity-80 z-10':
                !long,
        }"
    >
        <span :class="[long ? 'long-loader' : 'loader']" />
    </div>
</template>

<script setup lang="ts">
defineProps({
    long: {
        type: Boolean,
        default: false,
    },
})
</script>

<style scoped lang="scss">
@keyframes pulse {
    to {
        transform: scale(0.8);
        opacity: 0.5;
    }
}
.loader {
    color: #fff;
    font-family: Consolas, Menlo, Monaco, monospace;
    font-weight: bold;
    font-size: 78px;
    opacity: 0.8;
    &:before {
        content: '{';
        display: inline-block;
        animation: pulse 0.4s alternate infinite ease-in-out;
    }
    &:after {
        content: '}';
        display: inline-block;
        animation: pulse 0.4s 0.3s alternate infinite ease-in-out;
    }
}

@keyframes hitZak {
    0% {
        left: 0;
        transform: translateX(-1%);
    }
    100% {
        left: 100%;
        transform: translateX(-99%);
    }
}
.long-loader {
    width: 100%;
    height: 4.8px;
    display: inline-block;
    position: relative;
    background: rgba(255, 255, 255, 0.15);
    overflow: hidden;
    &::after {
        content: '';
        width: 96px;
        height: 4.8px;
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        animation: hitZak 1s linear infinite alternate;
    }
}
</style>
