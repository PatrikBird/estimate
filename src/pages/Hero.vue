<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const router = useRouter()

const enteredName = ref('')
const isTshirtMode = ref(false)
const isObserver = ref(false)

async function handleSubmit() {
  mainStore.user.username = enteredName.value
  mainStore.user.isObserver = isObserver.value
  await mainStore.createNewSession()
  router.push(`/${mainStore.session.collectionId}`)
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="flex-col justify-center hero-content lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">Simple Story Estimation</h1>
        <p class="mb-5">Create a new session and simply share the link with others.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
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
              <label class="cursor-pointer label mt-2">
                <span class="label-text">Numbers</span>
                <input
                  v-model="isTshirtMode"
                  type="checkbox"
                  class="toggle toggle-primary" />
                <span class="label-text">T-Shirt Sizes</span>
              </label>
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" :disabled="enteredName == ''">
                Start new Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
