<template>
    <div class="breadcrumb-container">
        <a-breadcrumb v-if="breadcrumbVisible">
            <a-breadcrumb-item>
                <RouterLink to="/">Home</RouterLink>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                {{ item.title }}
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute, } from 'vue-router'
    import type { RouteRecordRaw } from "vue-router"
    import { routes } from '@/router/index'

    const route = useRoute()
    const breadcrumbVisible = computed(() => {
        return route.path !== "/index"
    })
    console.log(route.path)

    // 辅助函数：递归查找路径对应的路由链
    function findMatchedRoutes(path: string, routes: RouteRecordRaw[], basePath = ''): { title: string, path: string }[] {
        for (const route of routes) {
            const fullPath = basePath + '/' + route.path.replace(/^\//, '')
            if (route.path === '' && route.redirect) continue // 忽略重定向壳

            if (path === fullPath) {
                return [{
                    title: (route.meta?.title ?? '') as string,
                    path: fullPath
                }]
            }

            if (route.children) {
                const childMatched = findMatchedRoutes(path, route.children, fullPath)
                if (childMatched.length) {
                    return [
                        {
                            title: (route.meta?.title ?? '') as string,
                            path: fullPath
                        },
                        ...childMatched
                    ]
                }
            }
        }

        return []
    }

    const breadcrumbs = computed(() => {
        return findMatchedRoutes(route.path, routes)
    })
</script>
