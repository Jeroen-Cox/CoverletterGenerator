<template>
  <div id="total">
    <div class="header">
      <h1 class="title">CoverGP</h1>
      <div>
        <span v-if="userAuthentication && userAuthentication.email" class="user-text"
          >User: {{ userAuthentication.email }}</span
        >
        <span v-if="userData && userData.credits" class="user-text">Credits: {{ userData.credits }}</span>
        <v-btn @click.native="logOutUser" variant="outlined" color="white" data-testid="createAccountBtn"
          >Log out</v-btn
        >
      </div>
    </div>

    <div class="main">
      <div class="left-panel">
        <v-btn variant="flat" color="primary" class="mb-2" @click.native="prepareNewApplication">New application</v-btn>
        <div class="left-panel__applications-wrapper">
          <v-card
            v-for="application in applications"
            @click.native="selectApplication(application.uid)"
            :variant="application.uid === selectedApplicationUid ? 'tonal' : 'outlined'"
            class="left-panel__applications-wrapper__application-cards"
            color="#979797"
            :title="application.company"
            :subtitle="application.jobTitle"
          />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const applicationStore = useApplicationsStore()

const { loadingUserData, userAuthentication, userData } = storeToRefs(userStore)

const logOutUser = async () => {
  userStore.logOutUser()
}

onBeforeMount(() => {
  if(userAuthentication.value && userAuthentication.value.uid){
    userStore.getUserData(userAuthentication.value.uid)}
  
})
const coverLettersStore = useApplicationsStore()
const { applications, selectedApplicationUid } = storeToRefs(coverLettersStore)

const prepareNewApplication = async () => {
  applicationStore.resetApplicationForm()
  await navigateTo('/applications/new')
}

const selectApplication = async (uid?: string) => {
  if (uid) {
    await navigateTo('/applications')
    coverLettersStore.selectedApplicationUid = uid
    coverLettersStore.getCoverLetters()
  }
}
</script>

<style lang="scss" scoped>
#total {
  width: 100vw;
  height: 100vh;
  background-color: $background-color-1;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 58px;
  background-color: $background-color-2;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 1rem;
}

.title {
  color: $dark-primary-variant-2;
}
.user-text {
  color: $dark-primary-variant-1;
  margin-right: 1rem;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  padding-top: 58px;
}
.left-panel {
  display: flex;
  flex: 1;
  min-width: 250px;
  height: 100%;
  overflow: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem 1rem 0 1rem;
  background-color: white;

  &__applications-wrapper {
    width: 100%;
    max-height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;

    &__application-cards {
      margin-bottom: 1rem;
    }
  }
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
