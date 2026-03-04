<template>
  <BG>
    <!-- <BGM></BGM> -->
    <MENU></MENU>
    <div class="route_content">
      <!-- 路由页面展示区 -->
      <RouterView></RouterView>
    </div>
  </BG>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import BG from '@/components/bg.vue'
  import MENU from '@/components/menu.vue'
  import BGM from '@/components/bgm.vue'
</script>

<style scoped>
  .route_content{
    margin-left: 190px;
    margin-top: 105px;
  }
</style>
