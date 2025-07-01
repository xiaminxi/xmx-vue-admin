<template>
    <div class="content">
        <router-view v-slot="{ Component, route }">
            <KeepAlive :include="cacheView">
                <component v-if="!refreshFlags[route.name as string]" :is="Component" :key="route.path" />
            </KeepAlive>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
    import useRouteStore from '@/modules/useRouteStore';
    const routeStore = useRouteStore()
    const { cacheView, refreshFlags } = storeToRefs(routeStore)

</script>

<style lang="scss" scoped>
    .content {
        flex: 1;
        padding: 20px;
    }
</style>