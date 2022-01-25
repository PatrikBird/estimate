<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const voter = mainStore.getAllVoters()
const observer = mainStore.getAllObervers()

const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <div v-if="!voteRevealed">
    <EstimateTable :users="voter">
      <h1 class="my-4 prose lg:prose-xl">Voters</h1>
    </EstimateTable>
    <EstimateTable :users="observer">
      <h1 class="my-4 prose lg:prose-xl">Observers</h1>
    </EstimateTable>
  </div>
  <VoteResult v-else></VoteResult>
</template>
