<template>
  <div>
    <button @click="startGame">Старт</button>
    <pre>{{ player }}</pre>
  </div>
</template>

<script setup lang="ts">

interface Stats {
  intelligence: number,
  charisma: number,
  beauty: number,
  luck: number,
}

interface Skills {
  gaming: number,
  music: number,
  trading: number,
}

interface Variables {
  hunger: number,
  sleep: number,
  sanity: number,
  money: number
}

interface Player {
  gender: string,
  stats: Stats,
  skills: Skills,
  variables: Variables
}

const player: { value: Player | null } = ref(null);

const getRandomNumberInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//TODO: Пофиксить генерацию
//Генерация стат игрока с использованием треугольного распределения
function generateTriangularValue(min: number, max: number, mode: number) {
  const range = max - min + 1; // Количество возможных целых чисел в заданном диапазоне
  const random = Math.random();// Cлучайное число в диапазоне [0, 1)

  // Вычисляем распределенную вероятность вокруг пика (mode)
  let probability;
  if (random < Math.abs(mode - min) / range) {
    probability = random * range; // Увеличиваем вероятность близости к mode
  } else {
    probability = (1 - random) * range; // Увеличиваем вероятность близости к mode
  }

  // Определяем значение на основе распределенной вероятности
  if (probability <= range) {
    // Генерация значений в первой половине диапазона
    return Math.floor(min + Math.sqrt(2 * probability * (mode - min)));
  } else {
    // Генерация значений во второй половине диапазона
    return Math.floor(max - Math.sqrt((range - probability) * (max - mode)));
  }
}

const startGame = () => {
  const randomStats: Stats = {
    intelligence: generateTriangularValue(1, 10, 5),
    charisma: generateTriangularValue(1, 10, 5),
    beauty: generateTriangularValue(1, 10, 5),
    luck: generateTriangularValue(1, 10, 5),
  };

  const randomSkills: Skills = {
    gaming: getRandomNumberInRange(0, 4),
    music: getRandomNumberInRange(0, 4),
    trading: getRandomNumberInRange(0, 4),
  };

  const startVariables: Variables = {
    hunger: 100,
    sleep: 100,
    sanity: 100,
    money: 10000,
  };

  const genders = ['male', 'female'];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];

  player.value = {
    gender: randomGender,
    stats: randomStats,
    skills: randomSkills,
    variables: startVariables,
  };
};

</script>
