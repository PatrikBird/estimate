<script setup lang="ts">
import getCollection from '~/composables/getCollection'
import type { User } from '~/types/User'

const { documents } = getCollection('users')

// map documents to User



// const users = documents.value.map(
//   (document: any): User => ({
//     id: document.id,
//     username: document.username,
//     hasVoted: document.hasVoted,
//     isObserver: document.isObserver,
//   })
// )

// filter arrays and pass to table components
// const users: User[] = reactive(allUsers.value.filter(user => !user.isObserver))
// const observers: User[] = reactive(allUsers.value.filter(user => user.isObserver))
</script>

<template>
  <!-- <h2 v-if="error" class="error">Oops, something went wrong! Please try one more time</h2>
  <h2 v-if="loading">Loading...</h2>
  <div v-if="result"> -->
  <EstimateTable :data="users">
    <h1 class="my-4 prose lg:prose-xl">Users</h1>
  </EstimateTable>
  <EstimateTable :data="users">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <!-- </div> -->
</template>
