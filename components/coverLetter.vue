<template>
  <v-card
    :text="props.content"
    :subtitle="'Date: ' + formattedDate"
    :title="'Letter: ' + props.index?.toString()"
    class="mb-6"
    variant="tonal"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  content: { type: String, required: true },
  date: String,
  index: Number
})

const formattedDate = computed<string>(() => {
  return props.date ? useFormattedDate(props.date) : ''
})
</script>

<style lang="scss" scoped></style>
