<template>
  <div
    class="mt-10 flex w-full flex-col items-center md:flex-row md:items-stretch md:justify-evenly"
  >
    <div class="flex flex-col items-center gap-4">
      <p class="font-glow-blue font-basic text-7xl">Drinky</p>
      <CircleImageButton
        image-url="/img/menu/drinks.png"
        background-color="bg-black"
        size="lg"
        @click="changeRoute('/drinks')"
      />
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="font-glow-yellow font-basic text-7xl">Hry</p>
      <CircleImageButton
        image-url="/img/menu/games.png"
        background-color="bg-black"
        size="lg"
        @click="changeRoute('/games')"
      />
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="font-glow-turquoise font-basic text-7xl">Sneky</p>
      <CircleImageButton
        image-url="/img/menu/snacks.png"
        background-color="bg-black"
        size="lg"
        @click="changeRoute('/snacks')"
      />
    </div>
  </div>
  <div
    class="flex w-full flex-col items-center md:flex-row md:items-stretch md:justify-evenly"
  >
    <div class="flex flex-col items-center gap-4">
      <p class="font-glow-red font-basic text-7xl">Hudba</p>
      <CircleImageButton
        image-url="/img/menu/music.png"
        background-color="bg-black"
        size="lg"
        @click="openJam"
      />
    </div>

    <div class="flex flex-col items-center gap-4">
      <p class="font-glow-purple font-basic text-7xl">Hodnotenie</p>
      <CircleImageButton
        image-url="/img/menu/rating.png"
        background-color="bg-black"
        size="lg"
        @click="changeRoute('/rating')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const changeRoute = (pathUrl: string) => {
  if (pathUrl === "/rating" && !isRatingOpen.value)
    return confirm("Hodnotenie bude spustené o 22:00.");
  router.push(pathUrl);
};
const openJam = () => {
  window.open("https://spotify.link/bEWU6iH1YFb", "_blank");
};
const isRatingOpen = computed(() => {
  const now = new Date();
  const ratingStart = new Date("2023-12-31T22:00:00");
  return now > ratingStart;
});
</script>
