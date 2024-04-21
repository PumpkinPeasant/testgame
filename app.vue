<template>
  <div>
    <button @click="start">Старт</button>
    <pre>{{ player }}</pre>
  </div>
</template>

<script setup lang="ts">
import {startGame} from "~/composables/startGame";
//import {Player} from "~/interfaces/player";

//TODO: Добавить тип
const player: { value: object | null } = ref(null);

const start = () => {
  player.value = startGame()
}
</script>
