<template>
    <div class="h-fit w-full flex flex-col items-center">
        <nav
            class="w-full flex justify-evenly items-center px-0 py-1 bg-white shadow-md"
        >
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/menu">Menu</NuxtLink>
            <span>Logged in as {{ name }}</span>
            <button @click="logout">Logout</button>
        </nav>
        <CircleImageButton :image-url="'/img/drinks.svg'" />
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
