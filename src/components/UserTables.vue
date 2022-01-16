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
  <!-- <h2 v-if="error" class="error">Oops, something went wrong! Please try one more time</h2>
  <h2 v-if="loading">Loading...</h2>
  <div v-if="result"> -->
  <VotersTable :users="document"></VotersTable>
  <ObserversTable :users="document"></ObserversTable>
  <!-- </div> -->
</template>
