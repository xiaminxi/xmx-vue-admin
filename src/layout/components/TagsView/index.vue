<template>

    <ScrollView :activeKey="activeKey">
        <template v-for="item in tabsList" :key="item.path">
            <a-dropdown :trigger="['contextmenu']">
                <a-button class="tags-button" type="primary" :data-key="item.path" :class="changeClass(item)" @click="clickTabgsButton(item.path)">
                    <span>{{ item.title }}</span>
                    <CloseOutlined v-if="item.path !== '/index'" @click.passive="clickIcon" />
                </a-button>

                <template #overlay>
                    <a-menu @click="dropdownMenuClick($event, item, router)">
                        <a-menu-item key="refresh">
                            <ReloadOutlined />
                            <span>刷新页面</span>
                        </a-menu-item>
                        <a-menu-item key="closeCurrent">关闭当前</a-menu-item>
                        <a-menu-item key="closeOthers">关闭其他</a-menu-item>
                        <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
                        <a-menu-item key="closeRight">关闭右侧</a-menu-item>
                        <a-menu-item key="closeAll">关闭全部</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </template>
    </ScrollView>

</template>

<script lang="ts" setup>
    import useRouteStore from '@/modules/useRouteStore';
    import { CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue';
    import ScrollView from "@/components/ScrollView/index.vue"
    const router = useRouter()
    const routeStore = useRouteStore()

    const { activeKey, tabsList } = storeToRefs(routeStore)
    const { dropdownMenuClick } = routeStore

    const changeClass = (item: TabItem) => {
        return item.path === activeKey.value ? "active-tag" : ""
    }

    const menuList = [
        { title: "刷新页面", icon: "" }
    ]


    const clickTabgsButton = (path: string) => {
        activeKey.value = path
        router.push({ path })
    }

    const clickIcon = () => {

    }
</script>

<style lang="scss" scoped>
    .tags-button {
        border-radius: 0px;
    }

    .active-tag {
        color: #1677ff;
        border-color: #1677ff;
    }
</style>