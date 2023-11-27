<template>
      <div class="header">
        <h1 class="title">CoverGP</h1>
        <div>
          <span v-if="userAuthentication && userAuthentication.email" class="user-text"
            >User: {{ userAuthentication.email }}</span
          >
          <span v-if="userData && userData.credits" class="user-text">Credits: {{ userData.credits }}</span>
          <v-btn @click.native="logOutUser" variant="outlined" color="white" data-testid="logOutBtn"
            >Log out</v-btn
          >
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  const userStore = useUserStore()
  const { loadingUserData, userAuthentication, userData } = storeToRefs(userStore)
  
  const logOutUser = async () => {
    userStore.logOutUser()
  }
  
  onMounted(() => {
    if(userAuthentication.value && userAuthentication.value.uid){
      userStore.getUserData(userAuthentication.value.uid)}
    
  })

 
  </script>
  
  <style lang="scss" scoped>
 
  
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
  
  
  </style>
  