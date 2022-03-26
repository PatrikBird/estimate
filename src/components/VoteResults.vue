<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const averageVote = computed(() => {
  const votes = props.voters.filter(u => u.vote !== null && u.vote !== '?')
  if (votes.length === 0) return null
  return votes.reduce((acc, u) => acc + +u.vote!, 0) / votes.length
})

const sortedVoters = computed(() => {
  return [...props.voters].sort((a, b) => {
    if (a.vote === null && b.vote === null) return 0
    if (a.vote === null) return -1
    if (b.vote === null) return 1
    return +a.vote! - +b.vote!
  })
})
</script>

<template>
  <p class="my-4">The average is: {{ averageVote }}</p>
  <progress-bar
    v-for="{ id, username, vote } in sortedVoters"
    :key="id"
    :name="username"
    :vote="vote">
  </progress-bar>
</template>
