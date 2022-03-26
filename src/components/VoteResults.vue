<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const averageVote = computed(() => {
  const votes = props.voters.filter(u => u.vote !== null && u.vote !== '?')
  if (votes.length === 0) return null
  return (votes.reduce((acc, u) => acc + +u.vote!, 0) / votes.length).toFixed(1)
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
  <div class="grid grid-cols-12 gap-2 my-8">
    <div class="col-span-3">
      <div class="text-center">Average</div>
    </div>
    <div class="col-span-8">
      <div class="relative">
        <progress
          id="progress-bar"
          class="progress progress-accent h-6 text-center align-sub"
          :value="averageVote ?? 0"
          max="100"></progress>
        <label for="progress-bar" class="progress-label absolute text-center">
          {{ averageVote }} => {{ closestAvailableVote }}
        </label>
      </div>
    </div>
  </div>

  <progress-bar
    v-for="{ id, username, vote } in sortedVoters"
    :key="id"
    :name="username"
    :vote="vote">
  </progress-bar>
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
