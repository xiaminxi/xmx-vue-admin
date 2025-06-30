<template>
    <div style="min-height: 100vh;height: 100vh;">
        <a-row style="height: 100%;">
            <a-col :span="span.left">
                <SideMenu />
            </a-col>
            <a-col :span="span.right">
                <div class="container">
                    <Header />
                    <div class="content">
                        <router-view v-slot="{ Component, route }">
                            <KeepAlive :include="['system']">
                                <component v-if="!route.meta.link" :is="Component" :key="route.path" />
                            </KeepAlive>
                        </router-view>
                    </div>
                    <Footer />
                </div>

            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
    import SideMenu from "./components/SideMenu/index.vue"
    import Header from "./components/Header/index.vue"
    import Footer from "./components/Footer/index.vue"
    import useConfigStore from "@/modules/useConfigStore";
    import { storeToRefs } from "pinia"
    import { computed } from "vue";
    const configStore = useConfigStore()
    const { collapsed } = storeToRefs(configStore)

    const span = computed(() => {
        return collapsed.value ? { left: 1, right: 23 } : { left: 4, right: 20 }
    })
</script>

<style lang="scss" scoped>

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;

        .content {
            flex: 1;
            padding: 20px;
        }
    }
</style>