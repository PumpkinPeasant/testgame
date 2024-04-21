<template>
  <div>
    <button @click="start">Старт</button>
    <input v-model="name" type="text" name="name" placeholder="Введите имя">
    <pre>{{ player }}</pre>
  </div>
</template>

<script setup lang="ts">
import {startGame} from "~/composables/startGame";
//import {Player} from "~/interfaces/player";

//TODO: Добавить тип
const player: { value: object | null } = ref(null);
const name: string = ref('')

const start = () => {
  player.value = startGame(name)
}
</script>
