<script setup lang="ts">
import { useMainStore } from '~/store/main';

const mainStore = useMainStore()
const document = mainStore.getAllUsers('users')

// FIXME: next line logs ref to console, which looks fine.
// ----- the very next however, is empty! why is that ??
// console.log(document)
// console.log(document.value)
// ------
// Therefore I can't filter the array :(
// const users = document.value.filter(d => d.isObserver === false)
</script>

<template>
  <!-- Very ugly duplication! -->
  <VotersTable :users="document"></VotersTable>
  <ObserversTable :users="document"></ObserversTable>
</template>
