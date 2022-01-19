<script setup lang="ts">
const availableVotes = [0, 1, 2, 3, 5, 8, 13, 21]
</script>

<template>
  <NumberSelector :available-votes="availableVotes"> </NumberSelector>
  <div class="row">
    <button class="btn btn-secondary m-2" disabled>Reset</button>
    <button class="btn btn-primary m-2" disabled>Reveal</button>
  </div>
</template>
