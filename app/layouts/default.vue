<template>
  <nav class="flex w-full justify-between bg-black py-2 shadow-md">
    <NuxtLink class="w-1/3" to="/menu">
      <span class="flex flex-col items-center" :class="{ [iconColor]: true }">
        <Icon size="20%" name="material-symbols:home-outline" />
        <p>{{ user }}</p>
      </span>
    </NuxtLink>
    <button class="w-1/3" @click="logout">
      <span class="flex flex-col items-center">
        <Icon size="20%" name="fluent:sign-out-20-regular" color="white" />
        <p class="text-white">Odhlásiť</p>
      </span>
    </button>
  </nav>
  <slot></slot>
</template>
<script lang="ts" setup>
const user = useState("user", () => "");
const router = useRouter();
if (user.value === "") router.push("/");

const logout = () => {
  user.value = "";
  localStorage.clear();
  router.push("/");
};

const route = useRoute();
const iconColor = computed(() => {
  switch (route.path) {
    case "/menu":
      return "text-pinky";
    default:
      return "text-white";
  }
});
</script>
