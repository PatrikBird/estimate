<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useMainStore } from '~/store/main';

const mainStore = useMainStore()

onKeyStroke('o', (e) => {
  e.preventDefault()
  mainStore.toggleObserver()
})
</script>

<template>
  <div class="row">
    <button class="btn btn-secondary m-2" disabled>Reset</button>
    <button class="btn btn-primary m-2" disabled>Reveal</button>
  </div>
</template>
