<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

const enteredName = ref('')
const isObserver = ref(false)

async function handleJoinSession() {
  mainStore.user.username = enteredName.value
  mainStore.user.isObserver = isObserver.value
  await mainStore.addUserToDb()
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="flex-col justify-center hero-content">
      <div class="text-center">
        <h1 class="mb-5 text-5xl font-bold">Join a session</h1>
        <p class="mb-5">Insert your name to continue.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="handleJoinSession">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                v-model="enteredName"
                type="text"
                placeholder="Your name"
                class="input input-bordered"
                autofocus />
            </div>
            <div class="form-control">
              <label class="cursor-pointer label mt-2">
                <span class="label-text">Voter</span>
                <input
                  v-model="isObserver"
                  type="checkbox"
                  class="toggle toggle-primary" />
                <span class="label-text">Observer</span>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" :disabled="enteredName == ''">
                Join Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
