<script setup lang="ts">
const props = defineProps<{ votes: string[] }>()

const avg = computed(() => {
  const arr = props.votes.map(i => +i)
  return arr.reduce((a, b) => a + b, 0) / arr.length
})
</script>

<template>
  <p class="my-4">The average is: {{ avg }}</p>

  <div class="grid grid-cols-12 gap-4 my-5">
    <div class="col-span-3">
      <div class="text-right">Your Name</div>
    </div>
    <div class="col-span-8">
      <div class="relative">
        <progress
          id="progress-bar"
          class="progress progress-primary h-6 text-center align-sub"
          value="40"
          max="100"></progress>
        <label for="progress-bar" class="progress-label absolute text-center">8</label>
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
