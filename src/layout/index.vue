<template>
    <div style="min-height: 100vh;height: 100vh;">
        <a-row style="height: 100%;">
            <a-col :span="span.left">
                <!-- 侧边栏菜单 -->
                <SideMenu />
            </a-col>
            <a-col :span="span.right">
                <div class="container">
                    <!-- 头部组件 -->
                    <CustomerHeader />
                    <!-- 多页签组件 -->
                    <TagsView />
                    <!-- 页面内容组件 -->
                    <Container />
                    <!-- 底部组件 -->
                    <CustomerFooter />
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
    import SideMenu from "./components/SideMenu/index.vue"
    import CustomerHeader from "./components/Header/index.vue"
    import CustomerFooter from "./components/Footer/index.vue"
    import TagsView from "./components/TagsView/index.vue"
    import Container from "./components/Container/index.vue"
    import useConfigStore from "@/modules/useConfigStore";
    import { storeToRefs } from "pinia"
    import { computed } from "vue";
    import useRouteStore from "@/modules/useRouteStore";
    const configStore = useConfigStore()
    const { collapsed } = storeToRefs(configStore)

    const routeStore = useRouteStore()
    const { addTab } = routeStore

    const route = useRoute()


    // 初始加入首页
    onMounted(() => {
        addTab(route)
    })

    // 路由变动就加入 tab
    watch(
        () => route.fullPath,
        () => {
            addTab(route)
        }
    )
    const span = computed(() => {
        return collapsed.value ? { left: 1, right: 23 } : { left: 4, right: 20 }
    })
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>