<script setup lang="ts">
const props = defineProps<{ name: string; vote: string | null; maxVote: number }>()
const val = computed(() =>
  props.vote === '?' || props.vote === 'break' ? '100' : props.vote,
)
</script>

<template>
  <div class="grid grid-cols-12 gap-2 my-5">
    <div class="col-span-3">
      <div class="text-center">
        {{ props.name }}
      </div>
    </div>
    <div class="col-span-8">
      <div class="relative">
        <progress
          id="progress-bar"
          class="progress h-6 text-center align-sub progress-primary"
          :class="{ 'progress-secondary': props.vote === '?' || props.vote === 'break' }"
          :value="val ?? 0"
          :max="props.maxVote"
        />
        <label for="progress-bar" class="progress-label absolute text-center">
          {{ props.vote === null ? 'not voted' : props.vote }}
        </label>
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
