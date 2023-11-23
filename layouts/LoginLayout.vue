<template>
  <v-app>
    <div class="main">
      <div class="content">
    <v-sheet rounded class="form-wrapper">
      <slot />
      </v-sheet>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background-color: $primary-brand-color;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 350px;
  max-width: 100%;
}

.form-wrapper {
  padding: 2rem;
}


</style>
