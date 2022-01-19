<script setup lang="ts">
import { useMainStore } from '~/store/main'
const mainStore = useMainStore()
</script>

<template>
  <NavBar />
  <InputModal v-if="!mainStore.user.id" />
  <div v-else class="overflow-x-auto max-w-xl m-5">
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
