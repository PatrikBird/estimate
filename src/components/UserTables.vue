<script setup lang="ts">
import data from '../assets/myMockedUserData.json'
// import axios from '~/middleware/axios'
const allUsers = reactive(data)
const users = reactive(allUsers.filter(user => !user.isObserver))
const observers = reactive(allUsers.filter(user => user.isObserver))

// const { loading, result, error, callAPI } = useFireBaseApi(async (query: any) => {
//   const res = await axios.get('URL')
//   return res.data.message
// })
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
