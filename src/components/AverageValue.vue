<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const votes = computed(() =>
  props.voters
    .filter(u => u.vote !== null && u.vote !== '?' && u.vote !== 'break')
    .map(u => +u.vote!),
)

const averageVote = computed(() => {
  if (votes.value.length === 0)
    return null

  return (votes.value.reduce((sum, v) => sum + v, 0) / votes.value.length).toFixed(1)
})

const availableVotes: string[] = inject('availableVotes')!
const availableVotesNum = computed(() => availableVotes.map(v => +v))

const closestAvailableVote = computed(() => {
  const availableVotes = availableVotesNum.value
  const average = +averageVote.value!
  if (average === null)
    return null

  const closest = availableVotes.reduce((acc, v) =>
    Math.abs(v - average) < Math.abs(acc - average) ? v : acc,
  )
  return closest.toString()
})
</script>

<template>
  <div class="alert shadow-sm my-8 justify-center md:space-x-2">
    <tabler:math-avg />
    <p class="font-bold">
      {{ averageVote }} &#x2192; {{ closestAvailableVote }}
    </p>
  </div>
</template>
