<template>
  <h1 class="my-2 text-center text-xl text-white">Admin panel</h1>

  <loader-component v-if="loading" long />
  <div class="grid w-full grid-cols-1 gap-4 px-2 md:grid-cols-3 md:px-0">
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Drinky</h2>
      <button
        class="border-2 border-red-500 text-red-500"
        :class="{ grayscale: loading }"
        @click="clearAll(EntityType.DrinkOrder)"
      >
        Vycistit
      </button>
      <ul>
        <li
          v-for="drink in drinkOrders"
          :key="drink.id"
          class="flex justify-between border-t-2 border-white border-opacity-20 p-2 text-white"
        >
          {{ DrinkType[drink.drinkType] }} [{{ drink.user }}]
          <button
            class="border-2 border-green-500 text-green-500"
            :class="{ grayscale: loading }"
            @click="() => resolveOrder(EntityType.DrinkOrder, drink.id)"
          >
            Hotovo
          </button>
        </li>
      </ul>
    </div>
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Sneky</h2>
      <button
        class="border-2 border-red-500 text-red-500"
        :class="{ grayscale: loading }"
        @click="clearAll(EntityType.SnackOrder)"
      >
        Vycistit
      </button>
      <ul>
        <li
          v-for="snack in snackOrders"
          :key="snack.id"
          class="flex justify-between border-t-2 border-white border-opacity-20 p-2 text-white"
        >
          {{ SnackType[snack.snackType] }} [{{ snack.user }}]
          <button
            class="border-2 border-green-500 text-green-500"
            :class="{ grayscale: loading }"
            @click="() => resolveOrder(EntityType.SnackOrder, snack.id)"
          >
            Hotovo
          </button>
        </li>
      </ul>
    </div>
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Hlasovanie o hry</h2>
      <button
        class="border-2 border-yellow-500 text-yellow-500"
        :class="{ grayscale: loading }"
        @click="finishVoting"
      >
        Ukoncit hlasovanie
      </button>
      <ul>
        <li
          v-for="(value, key) in countedGameVotes"
          :key="key"
          class="border-t-2 border-white border-opacity-20 text-white"
        >
          {{ getGameName(Number(key)) }} [{{ value }} hlasov]
        </li>
      </ul>
    </div>
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Hodnotenia</h2>
      <ul>
        <li
          v-for="rating in ratings"
          :key="rating.id"
          class="border-t-2 border-white border-opacity-20 text-white"
        >
          <span class="text-green-300">
            [ {{ rating.user }} - {{ rating.stars }}x ⭐ ]
          </span>
          {{ rating.text }}
        </li>
      </ul>
    </div>
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Dostupnost drinkov</h2>
      <button
        class="border-2 border-yellow-500 text-yellow-500"
        :class="{ grayscale: loading }"
        @click="resetDrinks"
      >
        Reset drinkov
      </button>
      <ul>
        <li
          v-for="status in drinkStatuses"
          :key="status.id"
          class="flex justify-between border-t-2 border-white border-opacity-20 px-2"
          :class="[
            status.available ? 'text-green-500' : 'text-gray-400 line-through',
          ]"
        >
          <p>
            {{ DrinkType[status.drinkType] }}
          </p>
          <button
            class="border-2"
            :class="[
              !loading
                ? 'border-yellow-500 text-yellow-500'
                : 'border-gray-500 text-gray-500',
            ]"
            @click="toggleDrinkStatus(status.id)"
          >
            Zmen stav
          </button>
        </li>
      </ul>
    </div>
    <div
      class="mb-2 flex w-full flex-col content-start bg-white bg-opacity-10 md:mx-2"
    >
      <h2 class="text-center text-white">Dostupnost snekov</h2>
      <button
        class="border-2 border-yellow-500 text-yellow-500"
        :class="{ grayscale: loading }"
        @click="resetSnacks"
      >
        Reset snekov
      </button>
      <ul>
        <li
          v-for="status in snackStatuses"
          :key="status.id"
          class="flex justify-between border-t-2 border-white border-opacity-20 px-2"
          :class="[
            status.available ? 'text-green-500' : 'text-gray-400 line-through',
          ]"
        >
          <p>
            {{ SnackType[status.snackType] }}
          </p>
          <button
            class="border-2"
            :class="[
              !loading
                ? 'border-yellow-500 text-yellow-500'
                : 'border-gray-500 text-gray-500',
            ]"
            @click="toggleSnackStatus(status.id)"
          >
            Zmen stav
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DrinkType, EntityType, GameType, SnackType } from "~~/types";

definePageMeta({
  layout: false,
});

const loading = ref(false);

const { data: drinkStatuses, refresh: refreshDrinkStatuses } = await useFetch(
  "/api/drink-status",
  {
    lazy: true,
    server: false,
  },
);

const { data: snackStatuses, refresh: refreshSnackStatuses } = await useFetch(
  "/api/snack-status",
  {
    lazy: true,
    server: false,
  },
);

// Load drinks
const { data: drinkOrders, refresh: refreshDrinks } = await useFetch(
  "/api/drink",
  {
    lazy: true,
    server: false,
  },
);

// Load snacks
const { data: snackOrders, refresh: refreshSnacks } = await useFetch(
  "/api/snack",
  {
    lazy: true,
    server: false,
  },
);

// Load game votes
const { data: gameVotes, refresh: refreshGameVotes } = await useFetch(
  "/api/game",
  {
    lazy: true,
    server: false,
  },
);

// Load ratings
const { data: ratings } = await useFetch("/api/rating", {
  lazy: true,
  server: false,
});

const countedGameVotes = computed(() =>
  gameVotes.value?.reduce(
    (acc, curr) => {
      if (acc[curr.gameType]) {
        acc[curr.gameType]++;
      } else {
        acc[curr.gameType] = 1;
      }
      return acc;
    },
    {} as Record<GameType, number>,
  ),
);

const resolveOrder = async (entityType: EntityType, id: number) => {
  if (loading.value) return;
  loading.value = true;
  await useFetch(`/api/${entityType}/${id}`, {
    method: "DELETE",
  });
  if (entityType === EntityType.SnackOrder) await refreshSnacks();
  if (entityType === EntityType.DrinkOrder) await refreshDrinks();
  loading.value = false;
};

const getGameName = (gameType: GameType) => {
  switch (gameType) {
    case GameType.Bang:
      return "Bang";
    case GameType.CardsAgainstHumanity:
      return "Cards Against Humanity";
    case GameType.DoodleDungeon:
      return "Doodle Dungeon";
    case GameType.Kotatka:
      return "Kotatka";
    case GameType.KrycieMena:
      return "Krycie mena";
    case GameType.Piskvorky:
      return "Piškvorky";
    case GameType.Savana:
      return "Savana";
    case GameType.ShitHappens:
      return "Shit happens";
    case GameType.UnoFlip:
      return "Uno Flip";
    case GameType.BlackSkullIsland:
      return "Black Skull Island";
    case GameType.BlackStories2:
      return "Black Stories 2";
    case GameType.LittleMonster:
      return "Little Monster";
    case GameType.NinjaSchool:
      return "Ninja School";
    case GameType.PS5:
      return "Playstation 5";
    default:
      return "Unknown game";
  }
};

const finishVoting = async () => {
  if (loading.value) return;
  loading.value = true;
  await useFetch(`/api/game`, {
    method: "DELETE",
  });
  await refreshGameVotes();
  loading.value = false;
};

const clearAll = async (entityType: EntityType) => {
  if (loading.value) return;
  loading.value = true;
  await useFetch(`/api/${entityType}`, {
    method: "DELETE",
  });
  if (entityType === EntityType.SnackOrder) await refreshSnacks();
  if (entityType === EntityType.DrinkOrder) await refreshDrinks();
  loading.value = false;
};

const resetDrinks = async () => {
  if (loading.value) return;
  loading.value = true;
  await useFetch("/api/drink-status", {
    method: "PUT",
  });
  await refreshDrinkStatuses();
  loading.value = false;
};

const resetSnacks = async () => {
  if (loading.value) return;
  loading.value = true;
  await useFetch("/api/snack-status", {
    method: "PUT",
  });
  await refreshSnackStatuses();
  loading.value = false;
};

const toggleDrinkStatus = async (id: number) => {
  if (loading.value) return;
  loading.value = true;
  await useFetch(`api/drink-status/${id}`, {
    method: "PUT",
  });
  await refreshDrinkStatuses();
  loading.value = false;
};

const toggleSnackStatus = async (id: number) => {
  if (loading.value) return;
  loading.value = true;
  await useFetch(`api/snack-status/${id}`, {
    method: "PUT",
  });
  await refreshSnackStatuses();
  loading.value = false;
};
</script>
