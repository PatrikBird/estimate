<script setup lang="ts">
import getCollection from '~/composables/getCollection'


const { document } = getCollection('users')

console.log(document)
console.log(document.value)

// const test = document.

const bla = document.value.filter(d => d.isObserver === true)


</script>

<template>
  <!-- <h2 v-if="error" class="error">Oops, something went wrong! Please try one more time</h2>
  <h2 v-if="loading">Loading...</h2>
  <div v-if="result"> -->
  <EstimateTable :data="bla">
    <h1 class="my-4 prose lg:prose-xl">Users</h1>
  </EstimateTable>
  <EstimateTable :data="document">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <!-- </div> -->
</template>
