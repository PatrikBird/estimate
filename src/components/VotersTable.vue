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
            <DeleteButton />
          </button>
        </th>
        <th v-if="!isObserver">{{ username }}</th>
        <th v-if="!isObserver">{{ hasVoted }}</th>
      </tr>
    </tbody>
  </table>
</template>
