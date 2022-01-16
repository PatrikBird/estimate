<script setup lang="ts">
import type { User } from '../types/User'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

const props = defineProps<{ users: User[] }>()
</script>

<template>
  <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  <table class="table w-full">
    <thead>
      <tr>
        <th>Del</th>
        <th>Name</th>
        <th>Is Observer</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, username, isObserver } in props.users" :key="id">
        <th v-if="isObserver && id == mainStore.user.id">
          <button
            class="btn btn-outline btn-square btn-xs"
            @click="mainStore.deleteUserFromDb(id)">
            <DeleteButton />
          </button>
        </th>
        <th v-if="isObserver">{{ username }}</th>
        <th v-if="isObserver">{{ isObserver }}</th>
      </tr>
    </tbody>
  </table>
</template>
