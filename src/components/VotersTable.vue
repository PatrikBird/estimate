<script setup lang="ts">
import type { User } from '../types/User'
import { handleDelete } from '~/composables/deleteUser'

const props = defineProps<{ users: User[] }>()
</script>

<template>
  <h1 class="my-4 prose lg:prose-xl">Users</h1>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Del</th>
        <th>Name</th>
        <th>Has Voted</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, hasVoted, isObserver } in props.users" :key="id">
        <th v-if="!isObserver">
          <button class="btn btn-outline btn-square btn-xs" @click="handleDelete(id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-4 h-4 stroke-current">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </th>
        <th v-if="!isObserver">{{ username }}</th>
        <th v-if="!isObserver">{{ hasVoted }}</th>
      </tr>
    </tbody>
  </table>
</template>
