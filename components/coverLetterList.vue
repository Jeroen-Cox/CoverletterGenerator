<template>
  <div class="scroll-wrapper">
    <div class="coverLetter-list">
      <h1>Coverletters: {{ coverLetters ? coverLetters.length : '' }}</h1>
      <TransitionGroup name="listTransition">
        <cover-letter
          v-for="(coverLetter, i) in coverLetters"
          :key="coverLetter.uid"
          :content="coverLetter.content"
          :date="coverLetter.creationDate.toString()"
          :index="coverLetters ? coverLetters.length - i : 0"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Coverletter } from 'types/coverLetter.interface'
defineProps({
  coverLetters: { type: Array<Coverletter> }
})
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
