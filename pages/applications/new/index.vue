<template>
  <div class="right-panel">
    <application-form :application-uid="selectedApplicationUid" new-application />
    <div class="coverLetter-list">
      <h1>Coverletters: {{ coverLetters.length }}</h1>
      <TransitionGroup name="listTransition">
        <cover-letter
          v-for="(coverLetter, i) in coverLetters"
          :key="coverLetter.uid"
          :content="coverLetter.content"
          :index="coverLetters.length - i"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useApplicationsStore } from '@/stores/applications'
import { storeToRefs } from 'pinia'

definePageMeta({
  name: 'newApplication',
  layout: 'default'
})

const coverLettersStore = useApplicationsStore()
const { coverLetters, selectedApplicationUid } = storeToRefs(coverLettersStore)

onMounted(() => {
  coverLettersStore.getApplications()
})
</script>

<style lang="scss" scoped>
.right-panel {
  display: flex;
  flex: 5;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
}

.loader-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coverLetter-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2rem 4rem 2rem 0rem;
  flex: 2;
}
.coverletter-cards {
  margin-bottom: 1rem;
}

.listTransition-move,
.listTransition-enter-active,
.listTransition-leave-active {
  transition: all 0.5s ease;
}
.listTransition-enter-from,
.listTransition-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.listTransition-leave-active {
  position: absolute;
}
</style>
stores/applications
