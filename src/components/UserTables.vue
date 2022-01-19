<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const voter = mainStore.getAllVoters()
const observer = mainStore.getAllObervers()
</script>

<template>
  <EstimateTable :users="voter">
    <template #header> <h1 class="my-4 prose lg:prose-xl">Users</h1> </template>
  </EstimateTable>
  <EstimateTable :users="observer">
    <template #header> <h1 class="my-4 prose lg:prose-xl">Observers</h1> </template>
  </EstimateTable>
</template>
