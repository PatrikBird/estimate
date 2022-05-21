<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const votes = computed(() => props.voters.filter(u => u.vote !== null && u.vote !== '?'))
const maxVote = computed(() => votes.value.reduce((max, v) => Math.max(max, +v.vote!), 0))

const averageVote = computed(() => {
  if (votes.value.length === 0) return null
  return (votes.value.reduce((acc, u) => acc + +u.vote!, 0) / votes.value.length).toFixed(
    1
  )
})

const availableVotes: string[] = inject('availableVotes')!
const availableVotesNum = computed(() => availableVotes.map(v => +v))

const closestAvailableVote = computed(() => {
  const votes = availableVotesNum.value
  const average = +averageVote.value!
  if (average === null) return null
  const closest = votes.reduce((acc, v) =>
    Math.abs(v - average) < Math.abs(acc - average) ? v : acc
  )
  return closest.toString()
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
  <progress-bar
    class="my-8"
    name="Average"
    :vote="averageVote"
    :bar-style-class="'progress-accent'"
    >{{ averageVote }} &#x2192; {{ closestAvailableVote }}</progress-bar
  >

  <progress-bar
    v-for="{ id, username, vote } in sortedVoters"
    :key="id"
    :name="username"
    :vote="vote"
    :max-vote="maxVote"
    >{{ vote }}</progress-bar
  >
</template>

<style scoped>
.progress-label {
  margin: 0;
  left: 0;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
}
</style>
