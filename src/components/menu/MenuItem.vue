	<template>
    <!-- 情况1: 有子菜单 -->
    <el-sub-menu v-if="route.children && route.children.length" :index="route.path">
      <template #title>
        <el-icon v-if="route?.meta?.icon">
          <CustomIcon :iconName="(route.meta.icon as string)" />
        </el-icon>
        <span>{{ route?.meta?.title || route.name }}</span>
      </template>
      <!-- 递归调用自身，渲染子路由 -->
      <menu-item v-for="child in route.children" :key="child.path" :route="child" />
    </el-sub-menu>
    <!-- 情况2: 没有子菜单 (叶子节点) -->
    <el-menu-item v-else :index="route.path">
      <el-icon v-if="route?.meta?.icon">
        <CustomIcon :iconName="(route.meta.icon as string)" />
      </el-icon>
      <template #title>{{ route?.meta?.title || route.name }}</template>
    </el-menu-item>
  </template>
<script setup lang="ts">
import { type RouteRecordRaw } from 'vue-router'
import CustomIcon from '@/components/icons/CustomIcon.vue' // 根据实际路径调整
// 定义接收的路由对象类型
defineProps<{
  route: RouteRecordRaw
}>()
</script>
