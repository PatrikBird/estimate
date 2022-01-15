<script setup lang="ts">
import type { User } from '../types/User'
const props = defineProps<{ users: User[] }>()
</script>

<template>
  <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Is Observer</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, isObserver } in props.users" :key="id">
        <th v-if="isObserver">{{ username }}</th>
        <th v-if="isObserver">{{ isObserver }}</th>
      </tr>
    </tbody>
  </table>
</template>
