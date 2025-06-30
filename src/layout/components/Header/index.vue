<template>
    <div class="header">
        <ToggleMenu />
        <Breadcrumb />
    </div>
</template>

<script lang="ts" setup>
    import ToggleMenu from "./components/ToggleMenu.vue"
    import Breadcrumb from "./components/Breadcrumb.vue"

</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        align-items: center;
        padding: 16px;
    }
</style>