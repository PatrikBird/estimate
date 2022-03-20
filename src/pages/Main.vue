<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const showOverlay = computed(() => {
  if (!mainStore.user.id || !mainStore.user.username) return true
  if (!mainStore.isUserInDB()) return true
  return false
})
</script>

<template>
  <Overlay v-if="showOverlay" />
  <NavBar />
  <div class="overflow-x-auto max-w-xl m-5 mx-auto">
    <Controls
      :available-votes="[
        '0',
        '1',
        '2',
        '3',
        '5',
        '8',
        '13',
        '20',
        '40',
        '100',
        '?',
      ]"></Controls>
    <Tables />
  </div>
</template>
