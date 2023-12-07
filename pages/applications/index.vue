<template>
  <application-form :application-uid="selectedApplicationUid" />
  <CoverLetterList />
</template>

<script setup lang="ts">
import { useApplicationsStore } from '@/stores/applications'
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

definePageMeta({
  name: 'applications',
  layout: 'default'
})
const userStore = useUserStore()
const { userAuthentication } = storeToRefs(userStore)
const coverLettersStore = useApplicationsStore()
const { selectedApplicationUid } = storeToRefs(coverLettersStore)

onMounted(() => {
  if (userAuthentication.value && userAuthentication.value.uid) {
    coverLettersStore.getApplications()
  }
})
</script>

<style lang="scss" scoped></style>
