<template>
  <div class="relative h-[100vh] overflow-scroll">
    <loader-component v-if="loading" />
    <div class="h-full overflow-auto">
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Čo môžeme<br />
        zlepšiť?
      </p>
      <div>
        <div class="mx-4 grid grid-cols-5 gap-1">
          <div
            v-for="star in [1, 2, 3, 4, 5]"
            :key="star"
            @click="selectStar(star)"
          >
            <img :src="getImage(selectedStar >= star)" />
          </div>
        </div>
        <div class="mt-10 flex w-full items-center justify-center">
          <textarea
            v-model="message"
            placeholder="Aspoň 5 slovíčok, v dobrom či v zlom 🥺👉🏻👈🏻"
            class="mx-4 h-32 w-full rounded-xl border-2 border-pinky p-4"
            :disabled="alreadyVoted"
          ></textarea>
        </div>
        <CircleImageButton
          v-if="isRatingComplete && !alreadyVoted"
          floating
          icon="ic:outline-how-to-vote"
          size="sm"
          background-color="bg-pinky"
          @click="vote"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RateDTO } from "~~/types/dtos";
const message = ref("");
const user = useState("user", () => "");
const loading = ref(false);
const alreadyVoted = ref(false);
const selectedStar = ref(0);
const data = await $fetch(`/api/rating/${user.value}`);
if (data) {
  selectedStar.value = data.stars;
  message.value = data.text;
  alreadyVoted.value = true;
}
const getImage = (isFilled: boolean) =>
  isFilled ? "/img/rating/star_full.png" : "/img/rating/star_blank.png";

const selectStar = (star: number) => {
  if (alreadyVoted.value) return;
  selectedStar.value = star;
};
const isRatingComplete = computed(() => {
  return (
    selectedStar.value &&
    message.value
      .trim()
      .split(" ")
      .filter((x) => x.length).length >= 5
  );
});
const vote = async () => {
  loading.value = true;
  await useFetch(`/api/rating`, {
    method: "POST",
    body: {
      user: user.value,
      stars: selectedStar.value,
      text: message.value,
    } as RateDTO,
  });
  alreadyVoted.value = true;
  loading.value = false;
};
</script>
