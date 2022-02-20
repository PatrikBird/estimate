<!-- <script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{ users: User[] }>()

// @ts-expect-error: 6133
const reducedArray = computed(() => {
  return props.users.map(({ username, vote }) => ({
    username,
    vote,
  }))
})

// const sortedArray = computed(() =>
//   reducedArray.value.sort((a, b) => (a.vote ?? 0) - (b.vote ?? 0))
// )
// const labels = computed(() => sortedArray.value.map(({ username }) => username))
// const votes = computed(() => sortedArray.value.map(({ vote }) => vote))
</script>

<template>
  <div></div>
</template> -->
