<template>
  <div class="scrollbar-hide relative h-[100vh] overflow-scroll">
    <loader-component v-if="loading" />
    <div class="scrollbar-hide h-full overflow-auto">
      <p class="font-glow-pink my-10 text-center font-basic text-7xl">
        Zahlasuj<br />
        za hru!
      </p>
      <div class="grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-x-10">
        <div
          v-for="game in games"
          :key="game.type"
          class="flex flex-col items-center justify-between"
        >
          <CircleImageButton
            :image-url="game.image"
            :img-size="game.imageSize"
            :background-color="game.backgroundColor"
            :selected="selectedGame === game.type || votedGame === game.type"
            :selected-color="votedGame === game.type ? 'green' : 'yellow'"
            size="lg"
            @click="selectGame(game.type)"
          />
        </div>
        <CircleImageButton
          v-if="canSubmit"
          floating
          icon="ic:outline-how-to-vote"
          size="sm"
          background-color="bg-pinky"
          @click="vote(selectedGame!)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GameType } from "~~/types";
import type { VoteForGameDTO } from "~~/types/dtos";

const user = useState("user", () => "");
const loading = ref(false);

type Game = {
  name: string;
  type: GameType;
  image: string;
  backgroundColor: string;
  imageSize?: string;
};
const games = ref<Game[]>([
  {
    name: "Výbušné Koťátka",
    type: GameType.Kotatka,
    image: "/img/games/kotatka.png",
    backgroundColor: "bg-white",
    imageSize: "100",
  },
  {
    name: "Cards against humanity",
    type: GameType.CardsAgainstHumanity,
    image: "/img/games/cards.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Bang",
    type: GameType.Bang,
    image: "/img/games/bang.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Shit Happens",
    type: GameType.ShitHappens,
    image: "/img/games/shithappens.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Uno Flip",
    type: GameType.UnoFlip,
    image: "/img/games/unoflip.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Krycie Mená",
    type: GameType.KrycieMena,
    image: "/img/games/kryciemena.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Piškvorky",
    type: GameType.Piskvorky,
    image: "/img/games/piskvorky.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Savana",
    type: GameType.Savana,
    image: "/img/games/savana.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Doodle Dungeon",
    type: GameType.DoodleDungeon,
    image: "/img/games/doodle.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Cerne historky 2",
    type: GameType.BlackStories2,
    image: "/img/games/blackstories2.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Black Skull Island",
    type: GameType.BlackSkullIsland,
    image: "/img/games/blackskullisland.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Little Monster",
    type: GameType.LittleMonster,
    image: "/img/games/littlemonster.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Skola Nindzu",
    type: GameType.NinjaSchool,
    image: "/img/games/ninjaschool.png",
    backgroundColor: "bg-white",
  },
  {
    name: "Playstation 5",
    type: GameType.PS5,
    image: "/img/games/playstation5.png",
    backgroundColor: "bg-white",
  },
]);
const votedGame = ref<GameType | null>(null);

const data = await $fetch(`/api/game/${user.value}`);
votedGame.value = data?.gameType ?? null;

const selectedGame = ref<GameType | null>(null);
const changedVote = ref(false);
const selectGame = (gameType: GameType) => {
  if (selectedGame.value === gameType) {
    return;
  }
  selectedGame.value = gameType;
  changedVote.value = true;
};
const vote = async (type: GameType) => {
  loading.value = true;
  await useFetch(`/api/game`, {
    method: "POST",
    body: { type, user: user.value } as VoteForGameDTO,
  });
  selectedGame.value = null;
  votedGame.value = type;
  loading.value = false;
};

const canSubmit = computed(
  () => selectedGame.value !== null && selectedGame.value !== votedGame.value,
);
</script>
<style>
button {
  color: white;
}
button.selected {
  color: blue;
}
</style>
