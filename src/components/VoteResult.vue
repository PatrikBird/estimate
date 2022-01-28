<script setup lang="ts">
import type { User } from '~/types'

Chart.register(...registerables)

const props = defineProps<{ users: User[] }>()

const reducedArray = computed(() => {
  return props.users.map(({ username, vote }) => ({
    username,
    vote: Number(vote),
  }))
})

const sortedArray = computed(() => reducedArray.value.sort((a, b) => a.vote - b.vote))
const labels = computed(() => sortedArray.value.map(({ username }) => username))
const votes = computed(() => sortedArray.value.map(({ vote }) => vote))

const chartData = {
  labels: labels.value,
  datasets: [
    {
      data: votes.value,
      backgroundColor: ['#33C4B0'],
    },
  ],
}
</script>

<template>
  <BarChart :chart-data="chartData" />
</template>
