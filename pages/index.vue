<template>
  <div class="home">
    <h1 class="home__title">TC File Manager</h1>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    title: 'Home',
  })
</script>

<style lang="scss" scoped>
  .home {
    padding: $spacing-xl $spacing-lg;

    &__title {
      font-size: 2rem;
      color: $color-primary;
    }
  }
</style>
