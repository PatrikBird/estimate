<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const voter = mainStore.getAllVoters()
const observer = mainStore.getAllObervers()
</script>

<template>
  <EstimateTable :users="voter">
    <template #header>Users</template>
  </EstimateTable>
  <EstimateTable :users="observer">
    <template #header>Observer</template>
  </EstimateTable>
</template>
