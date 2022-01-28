<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

const allUsers = mainStore.getAllUsers()
const observers = computed(() => {
  return allUsers.value.filter(u => u.isObserver === true)
})

const voters = computed(() => {
  return allUsers.value.filter(u => u.isObserver === false)
})

const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <!-- <div v-if="!voteRevealed"> -->
  <EstimateTable :users="voters">
    <h1 class="my-4 prose lg:prose-xl">Voters</h1>
  </EstimateTable>
  <EstimateTable :users="observers">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <!-- </div> -->
  <!-- <VoteResult v-else :users="voters"></VoteResult> -->
</template>
