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

const allVotes = computed(() => voters.value.map(i => i.vote))
const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <div v-if="!voteRevealed">
    <EstimateTable :users="voters">
      <h1 class="my-4 prose lg:prose-xl">Voters</h1>
    </EstimateTable>
    <EstimateTable :users="observers">
      <h1 class="my-4 prose lg:prose-xl">Observers</h1>
    </EstimateTable>
  </div>
  <div v-else>
    <vote-average :votes="allVotes"></vote-average>
  </div>
</template>
