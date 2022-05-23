<script setup lang="ts">
import type { Ref } from 'vue'
import { useMainStore } from '~/store/main'
import type { User } from '~/types'

const mainStore = useMainStore()
const allUsers: Ref<User[]> = mainStore.getAllUsers()

const observers = computed(() => {
  return allUsers.value.filter(u => u.isObserver === true)
})

const voters = computed(() => {
  return allUsers.value.filter(u => u.isObserver === false)
})

const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <div v-if="!voteRevealed">
    <EstimateTable :users="voters">Voters</EstimateTable>
    <EstimateTable :users="observers">Observers</EstimateTable>
  </div>
  <div v-else>
    <vote-results :voters="voters"></vote-results>
  </div>
</template>
