<script setup lang="ts">
const props = defineProps<{ numbers: number[] }>()

const activeItem = ref()
function selectItem(idx: number) {
  activeItem.value = idx
}
</script>

<template>
  <button
    v-for="number, idx in props.numbers"
    :key="number"
    class="btn btn-primary m-2"
    :class="{ 'btn-accent': idx === activeItem }"
    @click="selectItem(idx)">
    {{ number }}
  </button>
</template>
