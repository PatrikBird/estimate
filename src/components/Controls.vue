<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useMainStore } from '~/store/main'

const props = defineProps<{ availableVotes: string[] }>()

const mainStore = useMainStore()

const activeItem = ref()
function handleChosenVote(idx: number, vote: string) {
  activeItem.value = idx
  mainStore.user.vote = vote
  mainStore.updateVote()
}

onKeyStroke('o', e => {
  mainStore.toggleObserver()
  // reset visuals
  activeItem.value = null
})

function resetVoteHandler() {
  mainStore.resetVotes()
  // reset visuals
  activeItem.value = null
}

function revealVoteHandler() {
  mainStore.revealVotes()
  // reset visuals
  activeItem.value = null
}

const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <button
    v-for="(vote, idx) in props.availableVotes"
    :key="vote"
    class="btn btn-primary m-2"
    :class="{ 'btn-accent': idx === activeItem }"
    :disabled="voteRevealed"
    @click="handleChosenVote(idx, vote)">
    {{ vote }}
  </button>
  <div class="row">
    <p v-visible="voteRevealed">Reset to begin a new vote</p>
  </div>
</template>
