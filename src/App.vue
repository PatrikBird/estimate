<script setup lang="ts">
import data from './assets/myMockedUserData.json'
import Controls from './components/Controls.vue'
const numbers = [0, 1, 2, 3, 5, 8, 13, 21]
const allUsers = reactive(data)

const users = reactive(allUsers.filter(user => !user.isObserver))
const observers = reactive(allUsers.filter(user => user.isObserver))
</script>

<template>
  <NavBar />
  <div class="overflow-x-auto max-w-xl">
    <NumberSelector :numbers="numbers"></NumberSelector>
    <Controls />
    <EstimateTable :data="users">
      <template #header>
        <h1 class="my-4">Users</h1>
      </template>
    </EstimateTable>
    <EstimateTable :data="observers">
      <template #header>
        <h1 class="my-4">Observers</h1>
      </template>
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
