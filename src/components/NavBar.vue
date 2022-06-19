<script setup lang="ts">
import { isDark, toggleDark } from '~/composables/dark'
import { useMainStore } from '~/store/main'
const mainStore = useMainStore()

const btnText = computed(() => (mainStore.user.isObserver ? 'Observer' : 'Voter'))
</script>

<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
    <div class="px-2 mx-2 navbar-start">
      <span class="text-lg font-bold">Estimate</span>
      <a class="mx-5" href="https://github.com/PatrikBird/estimate" target="_blank"
        ><akar-icons:github-fill
      /></a>
      <button
        class="btn btn-secondary btn-outline ml-5"
        @click="mainStore.deleteAllUsersFromSession">
        Kick all
      </button>
    </div>
    <div class="navbar-end mr-5">
      <button title="Toggle theme" class="mx-5" @click="toggleDark()">
        <span v-if="isDark">
          <akar-icons:moon />
        </span>
        <span v-else>
          <akar-icons:sun />
        </span>
      </button>
      <button
        data-test="toggleObserverBtn"
        class="btn btn-info btn-outline ml-5"
        @click="mainStore.toggleObserver">
        {{ btnText }}
      </button>
      <button
        class="btn btn-primary btn-outline ml-5"
        @click="mainStore.deleteUserFromDb">
        Logout
      </button>
    </div>
  </div>
</template>
