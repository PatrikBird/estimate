<script setup lang="ts">
import type { User } from '~/types'
import { useMainStore } from '~/store/main'

const props = defineProps<{ users: User[] }>()

const mainStore = useMainStore()
const voteRevealed = mainStore.getVoteState()
</script>

<template>
  <slot></slot>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Del</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, vote, isObserver } in props.users" :key="id">
        <th v-if="username == mainStore.user.username" class="text-yellow-700">{{ username }}</th>
        <th v-else>{{ username }}</th>
        <th v-if="vote === null && !isObserver" class="text-yellow-700"><akar-icons:triangle-alert /></th>
        <th v-else-if="voteRevealed && !isObserver">{{ vote }}</th>
        <th v-else-if="isObserver"><akar-icons:eye-open /></th>
        <th v-else class="text-green-800"><akar-icons:circle-check /></th>
        <th>
          <button
            class="btn btn-outline btn-square btn-xs"
            @click="mainStore.deleteUserFromDb(id)">
            <DeleteButton />
          </button>
        </th>
      </tr>
    </tbody>
  </table>
</template>
