<script setup lang="ts">
const props = defineProps<{ name: string; vote: string | null }>()
</script>

<template>
  <div class="grid grid-cols-12 gap-2 my-5">
    <div class="col-span-3">
      <div class="text-center">{{ props.name }}</div>
    </div>
    <div class="col-span-8">
      <div class="relative">
        <progress
          id="progress-bar"
          class="progress progress-primary h-6 text-center align-sub"
          :value="props.vote ?? 0"
          max="100"></progress>
        <label for="progress-bar" class="progress-label absolute text-center">
          {{ props.vote }}</label
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-label {
  margin: 0;
  left: 0;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
}
</style>
