<script setup lang="ts">
// import { useMainStore } from '~/store/main'

const availableVotes = [0, 1, 2, 3, 5, 8, 13, 21]

// const mainStore = useMainStore()
</script>

<template>
  <NavBar />
  <!-- TODO: if localStore is empty, show modal -->
  <InputModal />
  <div class="overflow-x-auto max-w-xl m-5">
    <NumberSelector :available-votes="availableVotes"></NumberSelector>
    <Controls />
    <UserTables />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  padding-bottom: 5%;
  /* background-color: #aaa; */
}
</style>
