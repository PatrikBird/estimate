<script setup lang="ts">
import { addDoc, collection } from 'firebase/firestore'
import { db } from '~/firebase/config'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

const enteredName = ref('')
const formIsInvalid = ref(true)
function validateForm() {
  if (enteredName.value !== '') {
    mainStore.setUserName(enteredName.value)
    formIsInvalid.value = false
  }
}

const isObserver = ref(false)
async function handleSubmit() {
  validateForm()

  const colRef = collection(db, 'users')
  await addDoc(colRef, {
    username: enteredName.value,
    isObserver: isObserver.value,
    hasVoted: false,
  })
}
</script>

<template>
  <input id="my-modal" type="checkbox" :checked="formIsInvalid" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <!-- <p>Enter a name</p> -->
      <div class="modal-action justify-center">
        <form @submit.prevent="handleSubmit">
          <input
            v-model="enteredName"
            type="text"
            placeholder="Your name"
            class="text-center input input-primary input-bordered" />
          <div class="p-6 card bordered">
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text">Voter</span>
                <input v-model="isObserver" type="checkbox" class="toggle toggle-primary mx-2" />
                <span class="label-text">Observer</span>
              </label>
            </div>
          </div>
          <button class="btn btn-primary" :disabled="enteredName == ''">Accept</button>
        </form>
      </div>
    </div>
  </div>
</template>
