<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const router = useRouter()

async function onFormSubmit(enteredName: string, isObserver: boolean) {
  mainStore.user.username = enteredName
  mainStore.user.isObserver = isObserver
  await mainStore.createNewSession()
  router.push(`/${mainStore.collectionId}`)
}
</script>

<template>
  <BaseLogin @on-form-submit="onFormSubmit">
    <template #headline>Story Estimation</template>
    <template #subheadline>Start a new session and share the link with others.</template>
    <template #submitButtonText>Start new Session</template>
  </BaseLogin>
</template>
