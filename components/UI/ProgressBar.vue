<template>
  <div>
    <span class="label">{{label}}</span>
    <div class="progress">
      <span ref="bar" :class="['progress-bar', color]" :style="{ width: `${progress}%` }">{{ progress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  label:{
    type: String,
  }
})
</script>

<style scoped>
.progress {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  display: block;
  color: rgb(255, 251, 251);
  line-height: 30px;
  text-align: end;
  padding-right: 5px;
  transition: width 1s;
}
</style>
