<script setup lang="ts">
import getCollection from '~/composables/getCollection'

const { documents } = getCollection('users')

// todo: arrays are empty. why?
const users = documents.value.filter(u => u.isObserver === false)
const observers = documents.value.filter(u => u.isObserver === true)
</script>

<template>
  <!-- <h2 v-if="error" class="error">Oops, something went wrong! Please try one more time</h2>
  <h2 v-if="loading">Loading...</h2>
  <div v-if="result"> -->
  <EstimateTable :data="users">
    <h1 class="my-4 prose lg:prose-xl">Users</h1>
  </EstimateTable>
  <EstimateTable :data="observers">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <!-- </div> -->
</template>
