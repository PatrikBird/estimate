<script setup lang="ts">
import { useNameValidator } from '~/composables/nameValidator'

const isObserver = ref(false)

// TODO: restore name from localStorage using useLocalStorage()
const enteredName = ref('')
const nameIsValid = useNameValidator(enteredName)
const invalidInput = computed(() => !nameIsValid.value && enteredName.value)

const emits = defineEmits<{
  (e: 'onFormSubmit', enteredName: string, isObserver: boolean): void
}>()
</script>

<template>
  <div class="hero min-h-screen bg-base-200 prose max-w-none">
    <div class="flex-col justify-center hero-content">
      <div class="text-center">
        <h1 class="mb-5 text-5xl font-bold">
          <slot name="headline" />
        </h1>
        <p class="mb-5">
          <slot name="subheadline" />
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <form @submit.prevent="emits('onFormSubmit', enteredName, isObserver)">
            <div class="form-control">
              <label class="label">
                <span class="label-text" :class="{ 'text-red-500': invalidInput }"
                  >Name</span
                >
              </label>
              <input
                v-model="enteredName"
                type="text"
                placeholder="Your name"
                class="input input-bordered"
                :class="{ 'border-red-500': invalidInput }"
                autofocus />
            </div>
            <p v-visible="invalidInput" class="label-text text-red-500 mt-2 mb-0 text-left">
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
              <slot name="options" />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" :disabled="!nameIsValid">
                <slot name="submitButtonText" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
