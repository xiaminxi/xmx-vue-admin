<template>
  <a-watermark :content="appConfig.watermark">
    <router-view />
  </a-watermark>
</template>

<script lang="ts" setup>
import { appConfig } from './config/config';

</script>

<style lang="scss" scoped></style>