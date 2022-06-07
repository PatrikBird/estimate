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

function handleResetVote() {
  activeItem.value = null
  mainStore.user.vote = null
  mainStore.resetVotes()
}

const voteRevealed = mainStore.getVoteState()
watch(voteRevealed, () => {
  activeItem.value = null
})
</script>

<template>
  <button
    v-for="(vote, idx) in props.availableVotes"
    :key="vote"
    class="btn m-1 px-3"
    :class="{ 'btn-primary': idx === activeItem }"
    :disabled="voteRevealed || mainStore.user.isObserver"
    @click="handleChosenVote(idx, vote)">
    {{ vote }}
  </button>
  <div class="row">
    <button class="btn btn-secondary m-2" @click="handleResetVote">Reset</button>
    <button class="btn btn-primary m-2" @click="mainStore.revealVotes">Reveal</button>
    <p v-visible="voteRevealed" class="font-bold prose">Reset to begin a new vote</p>
  </div>
</template>
