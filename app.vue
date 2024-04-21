<template>
  <div class="my-8 mx-10 flex flex-col gap-2">
    <div v-if="player" class="flex flex-col gap-2">
      <div class="flex gap-2">
        <progress-bar
            label="Голод"
            color="bg-red-600"
            :progress="player.variables.hunger"/>
        <progress-bar
            label="Сон"
            color="bg-blue-600"
            :progress="player.variables.sleep"/>
        <progress-bar
            label="Рассудок"
            color="bg-green-600"
            :progress="player.variables.sanity"/>
      </div>
      <div class="flex mt-5 gap-10">
        <img :src="player.gender === 'male' ? Male : Female" alt="player" style="height: 200px; width: 200px">
        <div>
          <h3>Об игроке:</h3>
          <p>Имя: <strong>{{player.name}}</strong> </p>
          <p>Пол: <strong>{{player.gender}}</strong></p>
          <p>Деньги: <strong>{{player.variables.money}} руб.</strong></p>
        </div>
        <div>
          <h3>Статы:</h3>
          <p>Интеллект: <strong>{{player.stats.intelligence}}</strong></p>
          <p>Харизма: <strong>{{player.stats.charisma}}</strong></p>
          <p>Внешность: <strong>{{player.stats.beauty}}</strong></p>
          <p>Удача: <strong>{{player.stats.luck}}</strong></p>
        </div>
        <div>
          <h3>Навыки:</h3>
          <p>Видеоигры: <strong>{{player.skills.gaming}}</strong></p>
          <p>Музыка: <strong>{{player.skills.music}}</strong></p>
          <p>Трейдинг: <strong>{{player.skills.trading}}</strong></p>
          <p>Видео: <strong>{{player.skills.video}}</strong></p>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col gap-2">
      <input class="border border-slate-800 rounded-md self-start p-1" v-model="name" type="text" name="name" placeholder="Введите имя">
      <button class="bg-slate-800 py-1 px-3 text-slate-200 self-start" @click="start">Старт</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {startGame} from "~/composables/startGame";
import ProgressBar from "~/components/UI/ProgressBar.vue";
import Male from "~/assets/images/player/male/male.png"
import Female from "~/assets/images/player/female/female.png"
//import {Player} from "~/interfaces/player";

//TODO: Добавить тип
const player: { value: object | null } = ref(null);
const name: string = ref('')

const start = () => {
  player.value = startGame(name)
}
</script>
