<!-- <script setup lang="ts">
import type { User } from '../types/User'
const props = defineProps<{ data: User[] }>()
</script>

<template>
  <slot></slot>
  <table class="table w-full">
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, vote } in props.data" :key="id">
        <th>{{ id }}</th>
        <th>{{ username }}</th>
        <th>{{ vote }}</th>
      </tr>
    </tbody>
  </table>
</template> -->
