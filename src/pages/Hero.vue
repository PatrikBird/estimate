<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNameValidator } from '~/composables/nameValidator'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const router = useRouter()

const enteredName = ref('')
const nameIsValid = useNameValidator(enteredName)

const isTshirtMode = ref(false)
const isObserver = ref(false)

async function handleSubmit() {
  mainStore.user.username = enteredName.value
  mainStore.user.isObserver = isObserver.value
  await mainStore.createNewSession()
  router.push(`/${mainStore.collectionId}`)
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="flex-col justify-center hero-content">
      <div class="text-center">
        <h1 class="mb-5 text-5xl font-bold">Story Estimation</h1>
        <p class="mb-5">Start a new session and share the link with others.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-control">
              <label class="label">
                <span
                  class="label-text"
                  :class="{ 'text-red-500': !nameIsValid && enteredName }"
                  >Name</span
                >
              </label>
              <input
                v-model="enteredName"
                type="text"
                placeholder="Your name"
                class="input input-bordered"
                :class="{ 'border-red-500': !nameIsValid && enteredName }"
                autofocus />
            </div>
            <p
              v-visible="!nameIsValid && enteredName"
              class="label-text text-red-500 mt-2 text-left">
              Input contains invalid characters or is too long!
            </p>
            <div class="form-control">
              <label class="cursor-pointer label mt-2">
                <span class="label-text">Voter</span>
                <input
                  v-model="isObserver"
                  type="checkbox"
                  class="toggle toggle-primary" />
                <span class="label-text">Observer</span>
              </label>
              <label class="cursor-pointer label mt-2">
                <span class="label-text">Numbers</span>
                <input
                  v-model="isTshirtMode"
                  type="checkbox"
                  disabled
                  class="toggle toggle-primary" />
                <span class="label-text">T-Shirt Sizes</span>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" :disabled="!nameIsValid">
                Start new Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
