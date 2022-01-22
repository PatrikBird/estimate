<script setup lang="ts"></script>

<template>
  <div class="p-6 space-y-2 artboard">
    <div class="flex items-center">
      <label class="pr-2" for="voter1">voter1</label>
      <progress id="voter1" class="progress" value="21" max="100">21</progress>
    </div>
    <div class="flex items-center">
      <label class="pr-2" for="voter2">voter2withverylongnameruinsit</label>
      <progress id="voter2" class="progress" value="21" max="100">21</progress>
    </div>
    <progress class="progress" value="13" max="100"></progress>
    <progress class="progress" value="8" max="100"></progress>
    <progress class="progress" value="0" max="100"></progress>
    <progress class="progress" value="100" max="100"></progress>
  </div>
</template>
