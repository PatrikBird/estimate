<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const availableVotes = [0, 1, 2, 3, 5, 8, 13, 21]
</script>

<template>
  <NumberSelector :available-votes="availableVotes"> </NumberSelector>
  <div class="row">
    <button class="btn btn-secondary m-2" @click="mainStore.resetVotes">Reset</button>
    <button class="btn btn-primary m-2" @click="mainStore.revealVotes">Reveal</button>
  </div>
</template>
