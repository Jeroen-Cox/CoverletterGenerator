<template>
  <v-form v-model="formInvalid" @submit.prevent="generateCoverletter" class="generate-form">
    <h1>Job info</h1>
    <v-text-field
      variant="underlined"
      block
      density="comfortable"
      v-model="data.company"
      label="Company name"
      placeholder="Facebook, Meta, Google..."
      :rules="[required]"
    />

    <v-text-field
      variant="underlined"
      block
      density="comfortable"
      v-model="data.jobTitle"
      label="Position title"
      placeholder="Software Engineer..."
      :rules="[required]"
    />

    <v-text-field
      variant="underlined"
      block
      density="comfortable"
      v-model="data.jobUrl"
      label="Job opening URL"
      placeholder="https://www.linkedin.com/jobs/view/12345678910/"
      :rules="[required]"
    />

    <v-text-field
      variant="underlined"
      block
      density="comfortable"
      v-model="data.linkedinUrl"
      label="Your Linkedin profile"
      placeholder="https://www.linkedin.com/in/xyz/"
      :rules="[required]"
    />
    <span class="fieldLabel">Tell us about your last 3 achievements in your career</span>
    <v-textarea
      variant="underlined"
      block
      v-model="data.achievement_1"
      label="Achievement 1"
      :counter="500"
      auto-grow
      :maxlength="500"
      :rows="2"
      placeholder="I achieved X, by doing Z"
      :rules="[required]"
    />
    <v-textarea
      variant="underlined"
      block
      v-model="data.achievement_2"
      label="Achievement 2"
      :counter="500"
      auto-grow
      :maxlength="500"
      :rows="2"
      clearable
      placeholder="I achieved X, by doing Z"
      :rules="[required]"
    />
    <v-textarea
      variant="underlined"
      block
      v-model="data.achievement_3"
      label="Achievement 3"
      :counter="500"
      auto-grow
      :maxlength="500"
      :rows="2"
      clearable
      placeholder="I achieved X, by doing Z"
      :rules="[required]"
    />
    <v-btn
      v-if="newApplication"
      :disabled="!formInvalid"
      :loading="generatingCoverletter"
      type="submit"
      variant="flat"
      color="primary"
      block
      >{{ $t('application.generate_new') }}</v-btn
    >
    <v-btn
      v-else
      :disabled="!formInvalid"
      :loading="generatingCoverletter"
      type="submit"
      variant="flat"
      color="primary"
      block
      >{{ coverLetters.length > 0 ? $t('application.re_generate') : $t('application.generate') }}</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import { useApplicationsStore } from '@/stores/applications'
import { ApplicationInfo } from '~/types/applicationInfo.interface'
const props = defineProps({
  applicationUid: String,
  newApplication: { type: Boolean, required: false, default: false }
})

const formInvalid = ref(true)
const applicationStore = useApplicationsStore()
const { generatingCoverletter, applicationData, coverLetters } = storeToRefs(applicationStore)

const data: ApplicationInfo = reactive({
  company: applicationData.value?.company ?? '',
  jobTitle: applicationData.value?.jobTitle ?? '',
  jobUrl: applicationData.value?.jobUrl ?? '',
  achievement_1: applicationData.value?.achievement_1 ?? '',
  achievement_2: applicationData.value?.achievement_2 ?? '',
  achievement_3: applicationData.value?.achievement_3 ?? '',
  linkedinUrl: applicationData.value?.linkedinUrl ?? ''
})

watch(applicationData, (applicationData, prevApplicationData) => {
  if (applicationData) {
    data.company = applicationData.company
    data.jobTitle = applicationData.jobTitle
    data.jobUrl = applicationData.jobUrl
    data.achievement_1 = applicationData.achievement_1
    data.achievement_2 = applicationData.achievement_2
    data.achievement_3 = applicationData.achievement_3
    data.linkedinUrl = applicationData.linkedinUrl
  }
})

const generateCoverletter = async () => {
  if (props.newApplication) {
    await applicationStore.addApplicationFirebase(data).then(async (uid) => {
      applicationStore.selectedApplicationUid = uid
      await navigateTo('/applications')
    })
  } else {
    await applicationStore.updateApplicationFirebase(data)
  }
  applicationStore.generateCoverLetter(data)
}
</script>

<style lang="scss" scoped>
.fieldLabel {
  @include text-style-subheading;
  margin-bottom: 1rem;
}

.generate-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
  min-width: 450px;
  margin: 2rem 4rem 2rem 4rem;
}
</style>
stores/applications
