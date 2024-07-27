<template>
  <div class="scrollbar-hide relative h-[100vh] overflow-scroll">
    <loader-component v-if="loading" />
    <div class="scrollbar-hide h-full overflow-auto">
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Objednaj si drink!
      </p>
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Koktejly
      </p>
      <div class="grid grid-cols-1 md:grid-cols-4 md:gap-x-10">
        <div
          v-for="drink in cocktails"
          :key="drink.type"
          :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
          class="my-4 flex flex-col items-center justify-between gap-8"
          :class="{
            'cursor-not-allowed grayscale': hasOrder && !drink.ordered,
          }"
        >
          <span class="flex flex-col items-center justify-center gap-4">
            <p
              v-for="title in drink.titles"
              :key="title.text"
              class="font-basic text-7xl"
              :class="[`font-glow-${title.color}`]"
            >
              {{ title.text }}
            </p>
          </span>

          <CircleImageButton
            :image-url="drink.image"
            :background-color="drink.backgroundColor"
            :selected="drink.ordered || selectedDrink === drink.type"
            :disabled="!drink.available"
            size="lg"
            @click="drink.available && selectDrink(drink.type)"
          >
            <span
              v-if="!drink.available"
              class="absolute flex h-20 w-[120%] rotate-45 flex-row items-center justify-center bg-white font-bold"
            >
              <p class="text-xl text-red-500">Nedostupne 😔</p>
            </span>
          </CircleImageButton>
        </div>
      </div>
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Moktejly
      </p>
      <div class="grid grid-cols-1 md:grid-cols-4 md:gap-x-10">
        <div
          v-for="drink in mocktails"
          :key="drink.type"
          :ref="(e) => (refs[drink.type] = e as HTMLDivElement)"
          class="my-4 flex flex-col items-center justify-between gap-8"
          :class="{
            'cursor-not-allowed grayscale': hasOrder && !drink.ordered,
          }"
        >
          <span class="flex flex-col items-center justify-center gap-4">
            <p
              v-for="title in drink.titles"
              :key="title.text"
              class="font-basic text-7xl"
              :class="[`font-glow-${title.color}`]"
            >
              {{ title.text }}
            </p>
          </span>

          <CircleImageButton
            :image-url="drink.image"
            :image-size="drink.imageSize"
            :background-color="drink.backgroundColor"
            :selected="drink.ordered || selectedDrink === drink.type"
            :disabled="!drink.available"
            size="lg"
            @click="drink.available && selectDrink(drink.type)"
          >
            <span
              v-if="!drink.available"
              class="absolute flex h-20 w-[120%] rotate-45 flex-row items-center justify-center bg-white font-bold"
            >
              <p class="text-xl text-red-500">Nedostupne 😔</p>
            </span>
          </CircleImageButton>
        </div>
      </div>
      <CircleImageButton
        v-if="!hasOrder && selectedDrink != undefined"
        floating
        icon="ri:shopping-basket-2-line"
        size="sm"
        background-color="bg-pinky"
        @click="orderDrink(selectedDrink)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DrinkType } from "~~/types";
import type { CreateDrinkOrderDTO } from "~~/types/dtos";

const user = useState("user", () => "");

const { data: statuses } = await useFetch("/api/drink-status");
const { data: orders } = await useFetch("/api/drink");

const refs = ref<Record<string, HTMLDivElement>>({});

const isAvailable = (drinkType: DrinkType) =>
  statuses.value?.find((stat) => stat.drinkType === drinkType)?.available ??
  true;

const isOrdered = (drinkType: DrinkType) =>
  orders.value?.find((ord) => ord.drinkType === drinkType)?.user === user.value;

type Title = {
  text: string;
  color: string;
};
type Drink = {
  type: DrinkType;
  image: string;
  imageSize?: string;
  titles: Title[];
  backgroundColor: string;
  available: boolean;
  ordered: boolean;
};

const cocktails = ref<Drink[]>([
  {
    type: DrinkType.AperolSpritz,
    image: "/img/drinks/aperol.png",
    titles: [
      {
        text: "Aperol",
        color: "orange",
      },
      {
        text: "Spritz",
        color: "light-orange",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.AperolSpritz),
    ordered: isOrdered(DrinkType.AperolSpritz),
  },
  {
    type: DrinkType.Mojito,
    image: "/img/drinks/mojito.png",
    titles: [
      {
        text: "Mojito",
        color: "turquoise",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.Mojito),
    ordered: isOrdered(DrinkType.Mojito),
  },
  {
    type: DrinkType.Daiquiri,
    image: "/img/drinks/daiquiri.png",
    titles: [
      {
        text: "Daiquiri",
        color: "red",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.Daiquiri),
    ordered: isOrdered(DrinkType.Daiquiri),
  },
  {
    type: DrinkType.HugoSpritz,
    image: "/img/drinks/hugospritz.png",
    titles: [
      {
        text: "Hugo",
        color: "light-yellow",
      },
      {
        text: "Spritz",
        color: "light-green",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.HugoSpritz),
    ordered: isOrdered(DrinkType.HugoSpritz),
  },
  {
    type: DrinkType.GinTonic,
    image: "/img/drinks/gintonic.png",
    titles: [
      {
        text: "Gin",
        color: "white",
      },
      {
        text: "Tonic",
        color: "light-nude",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.GinTonic),
    ordered: isOrdered(DrinkType.GinTonic),
  },
  {
    type: DrinkType.LimoncelloProsecco,
    image: "/img/drinks/limoncelloprosecco.png",
    imageSize: "100",
    titles: [
      {
        text: "Limoncello",
        color: "limoncello-yellow",
      },
      {
        text: "Prosecco",
        color: "nude",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.LimoncelloProsecco),
    ordered: isOrdered(DrinkType.LimoncelloProsecco),
  },
  {
    type: DrinkType.Mimosa,
    image: "/img/drinks/mimosa.png",
    imageSize: "100",
    titles: [
      {
        text: "Mimosa",
        color: "peach",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.Mimosa),
    ordered: isOrdered(DrinkType.Mimosa),
  },
  {
    type: DrinkType.WhiteWine,
    image: "/img/drinks/whitewine.png",
    titles: [
      {
        text: "Biele",
        color: "beige",
      },
      {
        text: "Víno",
        color: "white",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.WhiteWine),
    ordered: isOrdered(DrinkType.WhiteWine),
  },
  {
    type: DrinkType.RedWine,
    image: "/img/drinks/redwine.png",
    titles: [
      {
        text: "Červené",
        color: "red",
      },
      {
        text: "Víno",
        color: "white",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.RedWine),
    ordered: isOrdered(DrinkType.RedWine),
  },
  {
    type: DrinkType.RandomAlco,
    image: "/img/drinks/random.png",
    titles: [
      {
        text: "Náhodný",
        color: "white",
      },
      {
        text: "Drink",
        color: "white",
      },
    ],
    backgroundColor: "bg-white",
    available: true,
    ordered: false,
  },
]);

const mocktails = ref<Drink[]>([
  {
    type: DrinkType.VirginMojito,
    image: "/img/drinks/mojito.png",
    titles: [
      {
        text: "Virgin",
        color: "white",
      },
      {
        text: "Mojito",
        color: "turquoise",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.VirginMojito),
    ordered: isOrdered(DrinkType.VirginMojito),
  },
  {
    type: DrinkType.SunriseNonTequila,
    image: "/img/drinks/nonTequilaSunrise.png",
    titles: [
      {
        text: "Non Tequila",
        color: "light-orange",
      },
      {
        text: "Sunrise",
        color: "red",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.SunriseNonTequila),
    ordered: isOrdered(DrinkType.SunriseNonTequila),
  },
  {
    type: DrinkType.VirginMimosa,
    image: "/img/drinks/mimosa.png",
    titles: [
      {
        text: "Virgin",
        color: "white",
      },
      {
        text: "Mimosa",
        color: "orange",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.VirginMimosa),
    ordered: isOrdered(DrinkType.VirginMimosa),
  },
  {
    type: DrinkType.GinTonicWithoutGin,
    image: "/img/drinks/gintonic.png",
    titles: [
      {
        text: "Gin Tonic",
        color: "white",
      },
      {
        text: "Without Gin",
        color: "light-nude",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.GinTonicWithoutGin),
    ordered: isOrdered(DrinkType.GinTonicWithoutGin),
  },
  {
    type: DrinkType.JazzyApple,
    image: "/img/drinks/jazzyapple.png",
    titles: [
      {
        text: "Jazzy",
        color: "white",
      },
      {
        text: "Apple",
        color: "blush-pink",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.JazzyApple),
    ordered: isOrdered(DrinkType.JazzyApple),
  },
  {
    type: DrinkType.RoyRogers,
    image: "/img/drinks/royrogers.png",
    titles: [
      {
        text: "Roy",
        color: "brown",
      },
      {
        text: "Rogers",
        color: "red",
      },
    ],
    backgroundColor: "bg-black",
    available: isAvailable(DrinkType.RoyRogers),
    ordered: isOrdered(DrinkType.RoyRogers),
  },
  {
    type: DrinkType.RandomNonAlco,
    image: "/img/drinks/random.png",
    titles: [
      {
        text: "Náhodný",
        color: "white",
      },
      {
        text: "Drink",
        color: "white",
      },
    ],
    backgroundColor: "bg-white",
    available: true,
    ordered: false,
  },
]);

const loading = ref(false);

const hasOrder = computed(() => {
  return [...cocktails.value, ...mocktails.value].some((c) => c.ordered);
});
const selectedDrink = ref<DrinkType | null>(null);
const selectDrink = (drinkType: DrinkType) => {
  if (hasOrder.value) {
    return confirm("Objednaný nápoj sa chystá. Musíš počkať.");
  }
  selectedDrink.value = drinkType;
};

const orderDrink = async (drinkType: DrinkType) => {
  loading.value = true;
  const drink: DrinkType =
    drinkType === DrinkType.RandomAlco || drinkType === DrinkType.RandomNonAlco
      ? getRandomDrink()
      : drinkType;

  const { error } = await useFetch("/api/drink", {
    method: "POST",
    body: {
      type: drink,
      user: user.value,
    } as CreateDrinkOrderDTO,
  });
  if (!error.value) {
    cocktails.value = [
      ...cocktails.value.map((c) => {
        c.ordered = false;
        if (c.type === drink) {
          c.ordered = true;
        }
        return c;
      }),
    ];
    mocktails.value = [
      ...mocktails.value.map((m) => {
        m.ordered = false;
        if (m.type === drink) {
          m.ordered = true;
        }
        return m;
      }),
    ];
  }
  loading.value = false;
  refs.value[drink]?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const getRandomDrink = (): DrinkType => {
  const drinkGroup =
    selectedDrink.value === DrinkType.RandomAlco ? cocktails : mocktails;
  const values = drinkGroup.value.filter(
    (val) =>
      DrinkType[val.type] !== "RandomAlco" &&
      DrinkType[val.type] !== "RandomNonAlco" &&
      val.available,
  );
  return values[Math.floor(Math.random() * values.length)]!.type;
};
</script>
