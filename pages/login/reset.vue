<template>
  <div class="content">
    <div>
      <v-form v-model="formInvalid" @submit.prevent="submitForm" class="login-form">
        <h1 class="loginTitle">{{ $t('login.reset_title') }}</h1>
        <h2 class="loginSubtitle">{{ $t('login.reset_sub_title') }}</h2>
        <h1 class="fieldLabel">Email</h1>
        <v-text-field
          variant="outlined"
          v-model="emailAddress"
          label="E-mail"
          placeholder="john@doe.com"
          :rules="[required, isEmail]"
          :error="error"
        />

        <v-btn
          :loading="loadingUserData"
          :disabled="!formInvalid"
          type="submit"
          variant="flat"
          color="primary"
          block
          :error="error"
          class="mb-6"
          :style="{ marginBottom: '16px' }"
          data-testid="loginBtn"
          >{{ $t('login.reset') }}</v-btn
        >

        <v-btn
          @click.native="() => navigateTo({ path: '/' })"
          variant="tonal"
          color="secondary"
          block
          class="mt-6"
          :style="{ marginBottom: '16px' }"
          >{{ $t('login.back_to_login') }}</v-btn
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
  name: 'Reset',
  layout: 'login-layout'
})

const formInvalid = ref(true)
const emailAddress = ref('')

const userStore = useUserStore()
const { loadingUserData, error, errorMessage } = storeToRefs(userStore)

const submitForm = async () => {
  userStore.SendResetPasswordEmail(emailAddress.value)
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
