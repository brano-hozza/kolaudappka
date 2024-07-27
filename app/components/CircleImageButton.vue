<template>
  <div
    class="mb-4 flex cursor-pointer items-center justify-center overflow-hidden rounded-full"
    :class="{
      [backgroundColor]: true,
      [`border-4 ${getBorderColor(selectedColor)}`]: selected,
      'fixed bottom-5 right-5': floating,
      relative: !floating,
      [getSizeClass(size)]: true,
      'cursor-not-allowed opacity-50': disabled,
    }"
    @click="$emit('click')"
  >
    <NuxtImg
      v-if="!icon"
      class="mx-auto h-[60%]"
      :sizes="imgSize + 'px'"
      :src="imageUrl"
      alt="image"
    />
    <Icon v-else size="80%" :name="icon" :color="iconColor" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineEmits(["click"]);
defineProps({
  imageUrl: {
    type: String,
    default: null,
  },
  imgSize: {
    type: String,
    default: "200",
  },
  backgroundColor: {
    type: String,
    default: "bg-transparent",
  },
  selected: {
    type: Boolean,
    default: false,
  },
  selectedColor: {
    type: String as PropType<"green" | "yellow">,
    default: "green",
  },
  floating: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  iconColor: {
    type: String,
    default: "white",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const getBorderColor = (color: "green" | "yellow") => {
  switch (color) {
    case "green":
      return "border-green-500";
    case "yellow":
      return "border-yellow-500";
  }
};

const getSizeClass = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "w-20 h-20";
    case "md":
      return "w-40 h-40";
    case "lg":
      return "w-80 h-80";
  }
};
</script>
