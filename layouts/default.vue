<template>
    <div class="body">
        <nav>
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/menu">Menu</NuxtLink>
            <span>Logged in as {{ name }}</span>
            <button @click="logout">Logout</button>
        </nav>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
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
<style>
.body {
    height: 100vh;
    width: 100vw;
}

nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #fff;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}
</style>
