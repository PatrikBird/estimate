<script setup lang="ts">
import data from './assets/myMockedUserData.json'

const numbers = [0, 1, 2, 3, 5, 8, 13, 21]
const allUsers = reactive(data)
const users = reactive(allUsers.filter(user => !user.isObserver))
const observers = reactive(allUsers.filter(user => user.isObserver))
</script>

<template>
  <NavBar />
  <InputModal />
  <div class="overflow-x-auto max-w-xl m-5">
    <NumberSelector :numbers="numbers"></NumberSelector>
    <Controls />
    <EstimateTable :data="users">
      <h1 class="my-4 prose lg:prose-xl">Users</h1>
    </EstimateTable>
    <EstimateTable :data="observers">
      <h1 class="my-4 prose lg:prose-xl">Observers</h1>
    </EstimateTable>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
