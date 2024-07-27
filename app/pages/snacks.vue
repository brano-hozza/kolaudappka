<template>
  <div class="scrollbar-hide relative h-[100vh] overflow-scroll">
    <loader-component v-if="loading" />
    <div class="scrollbar-hide h-full overflow-auto">
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Niečo ti na<br />
        stole chýba?
      </p>
      <div class="grid grid-cols-1 md:grid-cols-4 md:gap-x-10">
        <div
          v-for="snack in snacks"
          :key="snack.type"
          class="my-4 flex flex-col items-center justify-between gap-8"
          :class="{
            'cursor-not-allowed grayscale': hasOrder && !snack.ordered,
          }"
        >
          <span class="flex flex-col items-center justify-center gap-4">
            <p
              v-for="title in snack.titles"
              :key="title.text"
              class="font-basic text-7xl"
              :class="[`font-glow-${title.color}`]"
            >
              {{ title.text }}
            </p>
          </span>
          <CircleImageButton
            :image-url="snack.image"
            :background-color="snack.backgroundColor"
            :selected="snack.ordered || selectedSnack === snack.type"
            :disabled="!snack.available"
            size="lg"
            @click="snack.available && selectSnack(snack.type)"
          >
            <span
              v-if="!snack.available"
              class="absolute flex h-20 w-[120%] rotate-45 flex-row items-center justify-center bg-white font-bold"
            >
              <p class="text-xl text-red-500">Nedostupne 😔</p>
            </span>
          </CircleImageButton>
        </div>
        <CircleImageButton
          v-if="!hasOrder && selectedSnack != undefined"
          floating
          icon="ri:shopping-basket-2-line"
          size="sm"
          background-color="bg-pinky"
          @click="orderSnack(selectedSnack)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SnackType } from "~~/types";
import type { CreateSnackOrderDTO } from "~~/types/dtos";

const user = useState("user", () => "");

const { data: statuses } = await useFetch("/api/snack-status");
const { data: orders } = await useFetch("/api/snack");

const isAvailable = (snackType: SnackType) =>
  statuses.value?.find((s) => s.snackType === snackType)?.available ?? true;

const isOrdered = (snackType: SnackType) =>
  orders.value?.find((s) => s.snackType === snackType)?.user === user.value;

type Title = {
  text: string;
  color: string;
};

type Snack = {
  type: SnackType;
  image: string;
  titles: Title[];
  backgroundColor: string;
  available: boolean;
  ordered: boolean;
};
const snacks = ref<Snack[]>([
  {
    type: SnackType.Sushi,
    image: "/img/snacks/sushi.png",
    titles: [
      {
        text: "Sushi",
        color: "salmon",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Sushi),
    ordered: isOrdered(SnackType.Sushi),
  },
  {
    type: SnackType.Chips,
    image: "/img/snacks/chips.png",
    titles: [
      {
        text: "Čipsiky",
        color: "vibrant-yellow",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Chips),
    ordered: isOrdered(SnackType.Chips),
  },
  {
    type: SnackType.Nachos,
    image: "/img/snacks/nachos.png",
    titles: [
      {
        text: "Načosky",
        color: "nude",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Nachos),
    ordered: isOrdered(SnackType.Nachos),
  },
  {
    type: SnackType.Peanuts,
    image: "/img/snacks/peanuts.png",
    titles: [
      {
        text: "Oriešky",
        color: "light-brown",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Peanuts),
    ordered: isOrdered(SnackType.Peanuts),
  },
  {
    type: SnackType.Macarons,
    image: "/img/snacks/macarons.png",
    titles: [
      {
        text: "Makrónky",
        color: "blush-pink",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Macarons),
    ordered: isOrdered(SnackType.Macarons),
  },
  {
    type: SnackType.Ocka,
    image: "/img/snacks/ocka.png",
    titles: [
      {
        text: "Očká",
        color: "red",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Ocka),
    ordered: isOrdered(SnackType.Ocka),
  },
  {
    type: SnackType.Pie,
    image: "/img/snacks/pie.png",
    titles: [
      {
        text: "Koláčik",
        color: "brown",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(SnackType.Pie),
    ordered: isOrdered(SnackType.Pie),
  },
]);

const loading = ref(false);

const hasOrder = computed(() => {
  return snacks.value.some((s) => s.ordered);
});

const selectedSnack = ref<SnackType | null>(null);
const selectSnack = (snackType: SnackType) => {
  if (hasOrder.value) {
    return confirm("Objednaný snack sa chystá. Musíš počkať.");
  }
  selectedSnack.value = snackType;
};

const orderSnack = async (snackType: SnackType) => {
  loading.value = true;
  const snack: SnackType = snackType;

  const { error } = await useFetch("/api/snack", {
    method: "POST",
    body: {
      type: snack,
      user: user.value,
    } as CreateSnackOrderDTO,
  });
  if (!error.value) {
    snacks.value = [
      ...snacks.value.map((s) => {
        s.ordered = false;
        if (s.type === snack) {
          s.ordered = true;
        }
        return s;
      }),
    ];
  }
  loading.value = false;
};
</script>
