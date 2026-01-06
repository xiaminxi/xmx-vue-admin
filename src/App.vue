<template>
    <a-config-provider :theme="theme">
        <a-watermark :content="appConfig.watermark">
            <router-view />
        </a-watermark>
    </a-config-provider>
</template>

<script lang="ts" setup>
    import { theme } from 'ant-design-vue';
    import { appConfig } from './config/config';

    const macaronColors = [
        '#F6C1CC', // 马卡龙粉
        '#F9D8B6', // 奶油杏
        '#CFEDE3', // 薄荷绿
        '#D6ECFA', // 天空蓝
        '#E6D9F2', // 薰衣草紫
        '#FFF1B8', // 柠檬黄
        '#D8EFE6', // 海盐青
        '#FFD3C4', // 蜜桃橙
        '#F1F2F4', // 奶昔灰
        '#E3F0C6'  // 开心果绿
    ]


    const color = ref(macaronColors[0])

    setInterval(() => {
        color.value = macaronColors[Math.floor(Math.random() * macaronColors.length)]
    }, 5500);
</script>

<style lang="scss" scoped></style>