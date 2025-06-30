<template>
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :inline-collapsed="collapsed" mode="inline" :items="menuItems" @click="onMenuClick" :style="menuStyle" />
</template>

<script setup lang="ts">
    import type { ItemType, MenuProps } from 'ant-design-vue'
    import type { RouteRecordRaw } from 'vue-router'
    import { routes } from '@/router/index'
    import useConfigStore from "@/modules/useConfigStore";
    import { storeToRefs } from "pinia"
    import resolveIcon from "@/utils/iconLoader"
    const configStore = useConfigStore()
    const { collapsed } = storeToRefs(configStore)

    const menuStyle = computed(() => {
        return collapsed.value ? { height: "100%" } : { height: "100%", width: "100%" }
    })


    const router = useRouter()
    const route = useRoute()

    // === 工具函数：根据路由生成菜单项 ===
    function generateMenus(routes: RouteRecordRaw[], basePath = ''): ItemType[] {
        return routes.flatMap(route => {
            /**过滤被隐藏的菜单 */
            if (route?.meta?.visible) {
                return []
            }
            const fullPath = basePath + (route.path ? '/' + route.path.replace(/^\//, '') : '')


            // 特殊处理首页
            const isIndex = route.children?.some(child => child.path === 'index')

            if (isIndex) {
                const indexRoute = route.children!.find(child => child.path === 'index')
                console.log(route?.meta?.icon)
                return [
                    {
                        key: '/index',
                        icon: resolveIcon(route?.meta?.icon as string),
                        label: indexRoute?.meta?.title || indexRoute?.name || '首页'
                    }
                ]
            }

            // 普通菜单项
            const item: ItemType = {
                key: fullPath || '/',
                label: route.meta?.title || route.name || fullPath,
                title: (route.meta?.title || route.name || fullPath) as string,
                children: route.children ? generateMenus(route.children, fullPath) : undefined,
                icon: resolveIcon(route?.meta?.icon as string)
            }

            return [item]
        })
    }

    const menuItems = generateMenus(routes)
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])

    // === 监听路由变化，同步菜单状态 ===
    watch(
        () => route.fullPath,
        (newPath) => {
            selectedKeys.value = [newPath]
            const segments = newPath.split('/').filter(Boolean)
            if (segments.length > 1) {
                openKeys.value = [`/${segments[0]}`]
            }
        },
        { immediate: true }
    )

    // === 菜单点击事件 ===
    const onMenuClick: MenuProps['onClick'] = (info) => {
        console.log("🚀 ~ info:", info)
        router.push(info.key as string)
    }
</script>
