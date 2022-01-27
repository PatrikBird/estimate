<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const voteRevealed = mainStore.getVoteState()

const availableVotes = [0, 1, 2, 3, 5, 8, 13, 21]

const activeItem = ref()
function handleChosenVote(idx: number, vote: number) {
  activeItem.value = idx
  mainStore.updateVote(mainStore.user.id, vote)
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
</script>

<template>
  <button
    v-for="(num, idx) in availableVotes"
    :key="num"
    class="btn btn-primary m-2"
    :class="{ 'btn-accent': idx === activeItem }"
    :disabled="voteRevealed"
    @click="handleChosenVote(idx, num)">
    {{ num }}
  </button>
  <div class="row">
    <button class="btn btn-secondary m-2" @click="resetVoteHandler">Reset</button>
    <button class="btn btn-primary m-2" @click="revealVoteHandler">Reveal</button>
    <p v-if="voteRevealed">Reset to begin a new vote</p>
  </div>
</template>
