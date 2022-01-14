<script setup lang="ts">
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
      <!-- todo: slot here -->
      <tr v-for="user in props.data" :key="user.id">
        <th>{{ user.id }}</th>
        <th>{{ user.username }}</th>
        <th>{{ user.hasVoted }}</th>
      </tr>
    </tbody>
  </table>
</template>
