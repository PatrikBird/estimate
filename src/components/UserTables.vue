<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const voter = mainStore.getAllVoters()
const observer = mainStore.getAllObervers()
</script>

<template>
  <EstimateTable :users="voter">
    <h1 class="my-4 prose lg:prose-xl">Users</h1>
  </EstimateTable>
  <EstimateTable :users="observer">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <VoteResult></VoteResult>
</template>
