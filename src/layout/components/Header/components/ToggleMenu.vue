<template>
    <div class="toggle-container" @click="toggleMenu">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
    </div>
</template>

<script lang="ts" setup>
    import useConfigStore from "@/modules/useConfigStore";
    import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
    import { storeToRefs } from "pinia";
    const configStore = useConfigStore()
    const { toggleMenu } = configStore
    const { collapsed } = storeToRefs(configStore)

</script>

<style lang="scss" scoped>

    .toggle-container {
        font-size: 18px;
        color: gray;
        margin-right: 16px;
        cursor: pointer;
    }
</style>