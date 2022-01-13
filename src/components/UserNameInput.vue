<script setup lang="ts">
import { useMainStore } from '~/store/main'

const main = useMainStore()

const enteredName = ref('')
function setUserName() {
  // eslint-disable-next-line no-console
  console.log(enteredName.value);
  main.setUserName(enteredName.value)
}
</script>

<template>
  <input id="my-modal-2" type="checkbox" checked class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <p>Enter a name</p>
      <div class="modal-action justify-center">
        <input
          v-model="enteredName"
          type="text"
          placeholder="username"
          class="text-center input input-primary input-bordered" />
        <label for="my-modal-2" class="btn btn-primary" @click="setUserName">Accept</label>
        <!-- <label for="my-modal-2" class="btn">Close</label> -->
      </div>
    </div>
  </div>
</template>
