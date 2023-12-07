<template>
  <div class="scroll-wrapper">
    <div class="coverLetter-list">
      <h1>Coverletters: {{ coverLetters.length }}</h1>
      <TransitionGroup name="listTransition">
        <cover-letter
          v-for="(coverLetter, i) in coverLetters"
          :key="coverLetter.uid"
          :content="coverLetter.content"
          :date="coverLetter.creationDate.toString()"
          :index="coverLetters.length - i"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const coverLettersStore = useApplicationsStore()
const { coverLetters } = storeToRefs(coverLettersStore)
</script>

<style lang="scss" scoped>
.coverLetter-list {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2rem 4rem 2rem 2rem;
  flex: 2;
}

.scroll-wrapper {
  height: 100%;
  overflow-y: auto;
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
