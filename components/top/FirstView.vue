<template>
  <section class="first-view">
    <h1>FirstView</h1>

    <p v-if="pending" class="first-view__status">読み込み中...</p>
    <p v-else-if="error" class="first-view__status">{{ error }}</p>
    <div v-else-if="latestRelease" class="first-view__release">
      <p class="first-view__version">
        最新バージョン: {{ latestRelease.version }}
        <span v-if="latestRelease.isPrerelease" class="first-view__badge">Pre-release</span>
      </p>
      <div v-if="latestRelease.hasBinary && latestRelease.downloads" class="first-view__downloads">
        <a
          v-if="latestRelease.downloads.mac_universal"
          :href="latestRelease.downloads.mac_universal"
        >
          macOS版（Universal）をダウンロード
        </a>
        <a v-if="latestRelease.downloads.win" :href="latestRelease.downloads.win">
          Windows版をダウンロード
        </a>
        <a v-if="latestRelease.downloads.zip" :href="latestRelease.downloads.zip"> ダウンロード </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { latestRelease, pending, error, load } = useReleases()

  onMounted(() => {
    load()
  })
</script>

<style lang="scss" scoped>
  .first-view__status {
    color: $color-secondary;
  }

  .first-view__version {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  .first-view__badge {
    padding: $spacing-xs $spacing-sm;
    border-radius: 4px;
    background-color: $color-secondary;
    color: $color-background;
    font-size: 0.75rem;
  }

  .first-view__downloads {
    display: flex;
    gap: $spacing-sm;
    margin-top: $spacing-md;

    a {
      padding: $spacing-sm $spacing-md;
      border-radius: 4px;
      background-color: $color-primary;
      color: $color-background;

      &:hover {
        text-decoration: none;
        opacity: 0.9;
      }
    }
  }
</style>
