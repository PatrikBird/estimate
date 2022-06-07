<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ voters: User[] }>()

const validVoters = computed(() =>
  props.voters.filter(u => u.vote !== null && u.vote !== '?' && u.vote !== 'break')
)

const maxVote = computed(() =>
  validVoters.value.reduce((max, v) => Math.max(max, +v.vote!), 0)
)

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
  <div class="prose">
    <average-value :voters="validVoters" />
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
