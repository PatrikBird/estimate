<script setup lang="ts">
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import type { User } from '../types/User'

Chart.register(...registerables)

const props = defineProps<{ users: User[] }>()

const sortedLabels = computed(() => {
  const { users } = props
  const data = users.map(({ username, vote }) => ({
    labels: username,
    data: vote,
  }))
  return data.sort((a, b) => {
    if (a.data === null) {
      a.data = 0
      return 0
    }
    if (b.data === null) {
      b.data = 0
      return 0
    }
    return a.data - b.data
  }).map(({ labels }) => labels)
})

// TODO: reduce duplication
const sortedVotes = computed(() => {
  const { users } = props
  const data = users.map(({ username, vote }) => ({
    labels: username,
    data: vote,
  }))
  return data.sort((a, b) => {
    if (a.data === null) {
      a.data = 0
      return 0
    }
    if (b.data === null) {
      b.data = 0
      return 0
    }
    return a.data - b.data
  }).map(({ data }) => data)
})

const chartData = {
  labels: sortedLabels.value,
  datasets: [
    {
      data: sortedVotes.value as number[],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}
</script>

<template>
  <BarChart :chart-data="chartData" />
</template>
