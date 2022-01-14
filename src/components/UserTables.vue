<script setup lang="ts">
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import type { Ref } from 'vue'
// import getCollection from '~/composables/getCollection'
import { db } from '~/firebase/config'

// const allUsers = reactive(data)
// const observers = reactive(allUsers.filter(user => user.isObserver))

// const { documents } = getCollection('users')

const allUsers: Ref<string[]> = ref([])
const colRef = collection(db, 'users')
getDocs(colRef).then(onSnapshot => {
  const docs: any[] = []
  onSnapshot.docs.forEach(doc => {
    docs.push({ ...doc.data() })
  })
  allUsers.value = docs
})

// map json to obect user

// filter arrays and pass to table components
// const users: User[] = reactive(allUsers.value.filter(user => !user.isObserver))
// const observers: User[] = reactive(allUsers.value.filter(user => user.isObserver))
</script>

<template>
  <!-- <h2 v-if="error" class="error">Oops, something went wrong! Please try one more time</h2>
  <h2 v-if="loading">Loading...</h2>
  <div v-if="result"> -->
  <EstimateTable :data="users">
    <h1 class="my-4 prose lg:prose-xl">Users</h1>
  </EstimateTable>
  <EstimateTable :data="observers">
    <h1 class="my-4 prose lg:prose-xl">Observers</h1>
  </EstimateTable>
  <!-- </div> -->
</template>
