<script setup lang="ts">
import { useMainStore } from '~/store/main';

const mainStore = useMainStore()
const voter = mainStore.getAllVoters()
const observer = mainStore.getAllObervers()
</script>

<template>
  <!-- TODO: I can finally refactor this :) -->
  <VotersTable :users="voter"></VotersTable>
  <ObserversTable :users="observer"></ObserversTable>
</template>
