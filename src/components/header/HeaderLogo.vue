<template>
  <el-image class="logo" :src="logoSrc" :fit="fit">
    <template #error>
      <div class="image-viewer-slot image-slot">
        <el-icon><icon-picture /></el-icon>
      </div>
    </template>

  </el-image>
</template>
<script setup lang="ts">
import logoSrc from '@/assets/logo.svg';
const fit = 'contain'


</script>
<style lang="less" scoped>
.logo {
  width: var(--header-logo-width);
  height: var(--header-logo-height);
  padding: 4px;
}
</style>
