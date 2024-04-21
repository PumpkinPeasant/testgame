<template>
  <div class="my-8 mx-10 flex flex-col gap-2">
    <input class="border border-slate-800 rounded-md self-start p-1" v-model="name" type="text" name="name" placeholder="Введите имя">
    <button class="bg-slate-800 py-1 px-3 text-slate-200 self-start" @click="start">Старт</button>
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
