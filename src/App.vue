<script setup lang="ts">
const numbers = [0, 1, 2, 3, 5, 8, 13, 21]
</script>

<template>
  <NavBar />
  <InputModal />
  <div class="overflow-x-auto max-w-xl m-5">
    <NumberSelector :numbers="numbers"></NumberSelector>
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
  color: #fff;
}
</style>
