<script setup lang="ts">
import type { User } from '../types/User'
const props = defineProps<{ data: User[] }>()
</script>

<template>
  <slot name="header"></slot>
  <table class="table w-full">
    <thead>
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in props.data" :key="user.userId">
        <th>{{ user.userId }}</th>
        <th>{{ user.username }}</th>
        <th>{{ user.voted }}</th>
      </tr>
    </tbody>
  </table>
</template>
