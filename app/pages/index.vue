<template>
  <div class="flex h-screen w-full flex-col items-center justify-center gap-4">
    <p class="font-glow-pink font-basic text-6xl">Kolaudappka🎉</p>
    <div
      class="md: flex w-3/4 flex-col items-center justify-center p-2 md:w-1/2"
    >
      <pretty-input @change="user = $event" />
      <button
        class="m-4 w-full rounded p-1 text-white md:w-1/2"
        :class="buttonBorderColor"
        :disabled="canContinue"
        @click="continueToMenu"
      >
        START
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PrettyInput from "~/components/PrettyInput.vue";
definePageMeta({
  layout: false,
});

const user = useState("user", () => "");
onMounted(() => {
  user.value = localStorage.getItem("name") || "";
  if (user.value) continueToMenu();
});

const canContinue = computed(() => user.value.length < 3);
const buttonBorderColor = computed(() =>
  canContinue.value
    ? "border-2 border-black bg-gray-500 opacity-30 cursor-not-allowed"
    : "border-2 border-pinky bg-black cursor-pointer",
);
const router = useRouter();
const continueToMenu = () => {
  if (canContinue.value) return;
  localStorage.setItem("name", user.value);
  router.push("/menu");
};
</script>
