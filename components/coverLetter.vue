<template>
  <v-card :text="props.content" :subtitle="date" class="mb-6" variant="tonal" />
</template>

<script setup lang="ts">
const props = defineProps({
  content: String,
  date: String
})
</script>

<style lang="scss" scoped></style>
