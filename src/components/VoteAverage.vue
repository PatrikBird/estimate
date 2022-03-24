<script setup lang="ts">
const props = defineProps<{ votes: string[] }>()

const avg = computed(() => {
  const arr = props.votes.map(i => +i)
  return arr.reduce((a, b) => a + b, 0) / arr.length
})
</script>

<template>
  <p>The average of the Array is: {{ avg }}</p>
</template>
