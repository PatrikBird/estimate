<script setup lang="ts">
import type { User } from '../types/User'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

const props = defineProps<{ users: User[] }>()
</script>

<template>
  <h1 class="my-4 prose lg:prose-xl">Users</h1>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Del</th>
        <th>Name</th>
        <th>Vote</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, vote, isObserver } in props.users" :key="id">
        <th v-if="!isObserver && id == mainStore.user.id">
          <button
            class="btn btn-outline btn-square btn-xs"
            @click="mainStore.deleteUserFromDb(id)">
            <DeleteButton />
          </button>
        </th>
        <th v-if="!isObserver">{{ username }}</th>
        <th v-if="!isObserver">{{ vote }}</th>
      </tr>
    </tbody>
  </table>
</template>
