<script setup lang="ts">
import { useMainStore } from '~/store/main'

const main = useMainStore()

const enteredName = ref('')

const formIsInvalid = ref(true)
function validateForm() {
  if (enteredName.value !== '') {
    main.setUserName(enteredName.value)
    formIsInvalid.value = false
  }
}
</script>

<template>
  <input id="my-modal" type="checkbox" :checked="formIsInvalid" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <p>Enter a name</p>
      <div class="modal-action justify-center">
        <form @submit.prevent="validateForm">
          <input
            v-model="enteredName"
            type="text"
            placeholder="username"
            class="text-center input input-primary input-bordered" />
          <button class="btn btn-primary ml-3" :disabled="enteredName == ''">Accept</button>
        </form>
      </div>
    </div>
  </div>
</template>
