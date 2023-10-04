<template>
    <div class="h-fit w-full flex flex-col items-center">
        <nav
            class="w-full flex justify-between items-center px-4 py-2 bg-black shadow-md"
        >
            <NuxtLink class="w-1/3" to="/menu">
                <span
                    class="flex flex-col items-center justify-center"
                    :class="{ [iconColor]: true }"
                >
                    <Icon size="20%" name="material-symbols:home-outline" />
                    <p>{{ name }}</p>
                </span>
            </NuxtLink>
            <button class="w-1/3" @click="logout">
                <span class="flex flex-col items-center justify-center">
                    <Icon
                        size="20%"
                        name="fluent:sign-out-20-regular"
                        color="white"
                    />
                    <p class="text-white">Logout</p>
                </span>
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

const route = useRoute()
const iconColor = computed(() => {
    switch (route.path) {
        case '/menu':
            return 'text-green-500'
        default:
            return 'text-white'
    }
})
</script>
