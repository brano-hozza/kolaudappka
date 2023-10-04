<template>
    <div class="h-fit w-full flex flex-col items-center">
        <nav
            class="w-full flex justify-evenly items-center px-0 py-1 bg-black shadow-md"
        >
            <NuxtLink to="/menu">
                <span class="flex flex-col items-center justify-center">
                    <Icon size="10%" name="material-symbols:home-outline" />
                    <p class="text-white">{{ name }}</p>
                </span>
            </NuxtLink>
            <button @click="logout">
                <Icon size="10%" name="fluent:sign-out-20-regular" />
            </button>
        </nav>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
const name = ref('')
const router = useRouter()
onMounted(() => {
    name.value = localStorage.getItem('name') || ''
    if (!name.value) router.push('/')
})

const logout = () => {
    localStorage.removeItem('name')
    router.push('/')
}
</script>
