<script setup lang="ts">
import type { User } from '../types/User'
import { useMainStore } from '~/store/main'

const props = defineProps<{ users: User[] }>()

const mainStore = useMainStore()
// const voteState = await mainStore.getVoteState().then(voteState => voteState)
</script>

<template>
  <slot></slot>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Vote</th>
        <th>Del</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, vote } in props.users" :key="id">
        <th>{{ username }}</th>
        <th>{{ vote }}</th>
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
