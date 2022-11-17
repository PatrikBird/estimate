<script setup lang="ts">
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()

async function onFormSubmit(enteredName: string, isObserver: boolean) {
  mainStore.user.username = enteredName
  mainStore.user.isObserver = isObserver
  await mainStore.addUserToDb()
}
</script>

<template>
  <BaseLogin @on-form-submit="onFormSubmit">
    <template #headline>
      Join a Session
    </template>
    <template #subheadline>
      Insert your name to continue.
    </template>
    <template #submitButtonText>
      Join Session
    </template>
  </BaseLogin>
</template>
