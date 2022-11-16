<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMainStore } from '~/store/main'

const mainStore = useMainStore()
const router = useRouter()

// The following code is not ready yet
// const isCustomVote = ref(false)

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
    <!-- The following code is not ready yet
      <template #options>
      <label class="cursor-pointer label mt-2">
        <span class="label-text">Numbers</span>
        <input v-model="isCustomVote" type="checkbox" class="toggle toggle-primary" />
        <span class="label-text">Shirt sizes</span>
      </label>
    </template> -->
    <template #submitButtonText>Start new Session</template>
  </BaseLogin>
</template>
