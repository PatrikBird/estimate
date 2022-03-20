<script setup lang="ts">
import { useMainStore } from '~/store/main'

const props = defineProps<{ availableVotes: string[] }>()

const mainStore = useMainStore()

const activeItem = ref()
function handleChosenVote(idx: number, vote: string) {
  activeItem.value = idx
  mainStore.user.vote = vote
  mainStore.updateVote()
}

// onKeyStroke('o', e => { TODO: currently bugged, not so good anyway
//   mainStore.toggleObserver()
//   // reset visuals
//   activeItem.value = null
// })

const voteRevealed = mainStore.getVoteState()
watch(voteRevealed, () => {
  activeItem.value = null
})
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
    <button class="btn btn-secondary m-2" @click="mainStore.resetVotes">Reset</button>
    <button class="btn btn-primary m-2" @click="mainStore.revealVotes">Reveal</button>
    <p v-visible="voteRevealed">Reset to begin a new vote</p>
  </div>
</template>
