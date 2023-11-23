<template>
 
      <v-form v-model="formInvalid" @submit.prevent="submitForm" class="login-form">
        <h1 class="loginTitle">{{ $t('login.title') }}</h1>
        <h2 class="loginSubtitle">{{ $t('login.sub_title') }}</h2>
        <h1 class="fieldLabel">Email</h1>
        <v-text-field
          variant="outlined"
          v-model="emailAddress"
          label="E-mail"
          placeholder="john@doe.com"
          :rules="[required, isEmail]"
          :error="error"
        />
        <transition>
          <h1 class="fieldLabel">Password</h1>
        </transition>
        <transition>
          <v-text-field
            variant="outlined"
            v-model="password"
            type="password"
            label="Password"
            :rules="[required]"
            class="mb-0"
            :error="error"
          />
        </transition>

        <v-btn
          :loading="loadingUserData"
          :disabled="!formInvalid"
          type="submit"
          variant="flat"
          color="primary"
          block
          :error="error"
          class="mb-2"
          data-testid="loginBtn"
          >{{ $t('login.log_in') }}</v-btn
        >

        <v-btn
          @click.native="navigateToCreateAccountPage"
          variant="flat"
          color="secondary"
          block
          class="mb-2"
          data-testid="createAccountBtn"
          >{{ $t('login.try_out') }}</v-btn
        >

        <v-btn
          @click.native="navigageToResetAccountPage"
          variant="plain"
          color="error"
          block
          :error="error"
          >{{ $t('login.forgot') }}</v-btn
        >

        <v-alert
          v-if="error"
          closable
          class="mt-2"
          title="Invalid credentials"
          :text="errorMessage"
          type="error"
          variant="tonal"
        ></v-alert> </v-form
    >
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

definePageMeta({
  name: 'Login',
  layout: 'login-layout'
})

const formInvalid = ref(true)
const emailAddress = ref('')
const password = ref('')

const userStore = useUserStore()
const { loadingUserData, error, errorMessage } = storeToRefs(userStore)

const submitForm = async () => {
  userStore.logInUser({ emailAddress: emailAddress.value, password: password.value })
}

const navigateToCreateAccountPage = async () => await navigateTo({ path: '/account/create' })
const navigageToResetAccountPage = async () => await navigateTo({ path: '/account/reset' })
</script>

<style lang="scss" scoped>

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

.v-enter-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
