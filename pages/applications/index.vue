<template>
  <application-form :application-uid="selectedApplicationUid" />
  <CoverLetterList :coverletters="coverLetters" />
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
const applicationStore = useApplicationsStore()
const { selectedApplicationUid, coverLetters } = storeToRefs(applicationStore)

onMounted(() => {
  if (userAuthentication.value && userAuthentication.value.uid) {
    applicationStore.getApplications()
  }
})
</script>

<style lang="scss" scoped></style>
