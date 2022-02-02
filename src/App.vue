<script setup lang="ts">
import Hero from './pages/Hero.vue';
// import { useMainStore } from '~/store/main'
// const mainStore = useMainStore()

// const availableVotes = ['0', '1', '2', '3', '5', '8', '13', '21', '?']
</script>

<template>
  <Hero></Hero>
  <!-- <NavBar />
  <InputModal v-if="!mainStore.user.id" />
  <div class="overflow-x-auto max-w-xl m-5 mx-auto">
    <Controls :available-votes="availableVotes" />
    <Tables />
  </div> -->
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
