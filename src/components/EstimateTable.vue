<script setup lang="ts">
import type { User } from '~/types'
import { useMainStore } from '~/store/main'

const props = defineProps<{ users: User[] }>()

const mainStore = useMainStore()
const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <slot />
  <table class="table compact w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, vote, isObserver } in props.users" :key="id">
        <th v-if="username == mainStore.user.username" class="text-info">
          {{ username }}
        </th>
        <th v-else>{{ username }}</th>
        <th v-if="vote === null && !isObserver" class="text-secondary">
          <akar-icons:triangle-alert />
        </th>
        <th v-else-if="isObserver"><akar-icons:eye-open /></th>
        <th v-else-if="!voteRevealed && !isObserver" class="text-info">
          <akar-icons:circle-check />
        </th>
        <th v-else>{{ vote }}</th>
      </tr>
    </tbody>
  </table>
</template>
