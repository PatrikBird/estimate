<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
</script>

<template>
  <Overlay v-if="!mainStore.user.username"></Overlay>
  <NavBar></NavBar>
  <div class="overflow-x-auto max-w-xl m-5 mx-auto">
    <Controls
      :available-votes="['0', '1', '2', '3', '5', '8', '13', '21', '?']"></Controls>
    <Tables></Tables>
  </div>
</template>
