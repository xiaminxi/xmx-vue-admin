<template>

    <ScrollView :activeKey="activeKey">
        <template v-for="item in tabsList" :key="item.path">
            <a-dropdown :trigger="['contextmenu']">
                <a-button class="tags-button" :data-key="item.path" type="primary" ghost v-if="activeKey === item.path" @click="clickTabgsButton(item.path)">
                    <span>{{ item.title }}</span>
                    <CloseOutlined v-if="item.path !== '/index'" @click="clickIcon" />
                </a-button>
                <a-button class="tags-button" :data-key="item.path" v-else @click="clickTabgsButton(item.path)">
                    <span>{{ item.title }}</span>
                    <CloseOutlined v-if="item.path !== '/index'" @click="clickIcon" />
                </a-button>
                <template #overlay>
                    <a-menu @click="dropdownMenuClick($event, item, router)">
                        <a-menu-item key="refresh">刷新页面</a-menu-item>
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
    import { CloseOutlined } from '@ant-design/icons-vue';
    import ScrollView from "@/components/ScrollView/index.vue"
    const router = useRouter()
    const routeStore = useRouteStore()

    const { activeKey, tabsList } = storeToRefs(routeStore)
    const { dropdownMenuClick } = routeStore


    const clickTabgsButton = (path: string) => {
        activeKey.value = path
        router.push({ path })
    }

    const clickIcon = () => {
        alert(123)
    }
</script>

<style lang="scss" scoped></style>