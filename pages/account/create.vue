<template>
  <div class="content">
    <div>
      <v-form v-model="formInvalid" @submit.prevent="createAccount" class="login-form">
        <h1 class="loginTitle">{{ $t('create_account.title') }}</h1>
        <h2 class="loginSubtitle">{{ $t('create_account.sub_title') }}</h2>
        <h1 class="fieldLabel">Email</h1>
        <v-text-field
          variant="outlined"
          v-model="emailAddress"
          label="E-mail"
          placeholder="john@doe.com"
          :rules="[required, isEmail]"
          :error="error"
        />
        <h1 class="fieldLabel">Choose a password</h1>
        <v-text-field
          variant="outlined"
          v-model="password"
          type="password"
          label="Password"
          :rules="[required]"
          class="mb-0"
          :error="error"
        />
        <v-btn
          :loading="loadingUserData"
          :disabled="!formInvalid"
          type="submit"
          variant="flat"
          color="primary"
          block
          :error="errorMessage !== ''"
          class="mb-6"
          :style="{ marginBottom: '16px' }"
          data-testid="loginBtn"
          >{{ $t('create_account.submit_button') }}</v-btn
        >
        <v-btn @click.native="navigateToLoginPage" variant="tonal" color="secondary" block class="mt-6"
          >Back to login</v-btn
        >

        <v-alert
          v-if="error"
          closable
          class="mt-2"
          title="Invalid credentials"
          :text="errorMessage"
          type="error"
          variant="tonal"
        ></v-alert>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

definePageMeta({
  name: 'Create',
  layout: 'login-layout'
})

const formInvalid = ref(true)
const emailAddress = ref('')
const password = ref('')

const userStore = useUserStore()
const { loadingUserData, errorMessage, error } = storeToRefs(userStore)
const navigateToLoginPage = async () => await navigateTo({ path: '/' })

const createAccount = async () => {
  userStore.createUser(emailAddress.value, password.value)
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;
  max-width: 100%;
}
.loginTitle {
  @include text-style-display-large;
  font-weight: bold;
}

.loginSubtitle {
  @include text-style-body;
  margin-bottom: 1rem;
}

.logo {
  max-width: rem(55px);
  width: auto;
}

.actions {
  text-align: left;
  margin: 1rem 0;
}

.login-form {
  width: 100%;
  max-width: 450px;
  align-self: center;

  .fieldLabel {
    font-weight: bold;
    @include text-style-heading;
  }
}

.center {
  align-self: center;
}

@include mobile {
  .login-form {
    max-width: rem(480px);
    min-width: rem(250px);
  }
}
</style>
