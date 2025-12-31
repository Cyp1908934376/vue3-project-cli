<template>
  <div>
    <!-- 右上脚工具栏 -->
    <el-space>
      <!-- 通知图标 -->
      <custom-icon icon-name="Bell" />
      <!-- 用户头像 -->
      <el-avatar src="" :icon="UserFilled" @click="centerClick" />
    </el-space>
  </div>
</template>
<script setup lang="ts">
import CustomIcon from '../icons/CustomIcon.vue';
import { UserFilled } from '@element-plus/icons-vue'

/**
 * 中间工具栏点击事件
 */
const centerClick = () => {
  console.log('center clicked')
}
</script>

<style lang="less" scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
}
</style>
