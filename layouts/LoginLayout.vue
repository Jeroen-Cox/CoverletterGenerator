<template>
  <v-app>
    <div class="main">
      <slot />
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
</style>
