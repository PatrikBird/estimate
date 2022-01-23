<script setup lang="ts">
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const testData = {
  labels: ['Voter1', 'Voter2', 'Voter3', 'Voter4', 'Voter5'],
  datasets: [
    {
      data: [4, 8, 13, 4, 8],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}
</script>

<template>
  <BarChart :chart-data="testData" />
</template>
