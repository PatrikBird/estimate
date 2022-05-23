<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const votes = computed(() =>
  props.voters.filter(u => u.vote !== null && u.vote !== '?' && u.vote !== 'break')
)
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
  const availableVotes = availableVotesNum.value
  const average = +averageVote.value!
  if (average === null) return null
  const closest = availableVotes.reduce((acc, v) =>
    Math.abs(v - average) < Math.abs(acc - average) ? v : acc
  )
  return closest.toString()
})

const sortedVoters = computed(() => {
  const voters = props.voters.slice()
  voters.sort((a, b) => {
    if (a.vote === null) return -1
    if (b.vote === null) return 1
    if (a.vote === '?') return 1
    if (b.vote === '?') return -1
    if (a.vote === 'break') return 1
    if (b.vote === 'break') return -1
    return +a.vote! - +b.vote!
  })
  return voters
})
</script>

<template>
  <div>
    <div class="alert shadow-sm my-8 justify-center md:space-x-2">
      <tabler:math-avg />
      <p class="font-bold">{{ averageVote }} &#x2192; {{ closestAvailableVote }}</p>
    </div>
    <progress-bar
      v-for="{ id, username, vote } in sortedVoters"
      :key="id"
      :name="username"
      :vote="vote"
      :max-vote="maxVote" />
  </div>
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
