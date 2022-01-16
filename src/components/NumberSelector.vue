<script setup lang="ts">
import { useMainStore } from '~/store/main'

const props = defineProps<{ availableVotes: number[] }>()

const activeItem = ref()

const mainStore = useMainStore()
function handleChosenVote(idx: number, vote: number) {
  activeItem.value = idx
  mainStore.updateVote(mainStore.user.id, vote)
}
</script>

<template>
  <button
    v-for="(num, idx) in props.availableVotes"
    :key="num"
    class="btn btn-primary m-2"
    :class="{ 'btn-accent': idx === activeItem }"
    @click="handleChosenVote(idx, num)">
    {{ num }}
  </button>
</template>
