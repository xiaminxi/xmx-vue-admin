import { defineStore } from "pinia";
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

const useRouteStore = defineStore("useRouteStore", {
    state: (): UseRouteStore => {
        return {
            tabsList: [
                // { title: "首页", path: "/index", name: "Index" }
            ],
            activeKey: null as unknown as string,
            cacheView: [],
            refreshFlags: {},
        }
    },
    getters: {
        keepAliveKey(state) {
            return state.tabsList.map(item => item.name)
        }
    },
    actions: {
        setActiveKey(activeKey: string) {
            this.activeKey = activeKey
        },
        addTab(route: RouteLocationNormalizedLoaded) {
            console.log("🚀 ~ addTab ~ route:", route)
            if (!this.tabsList.find(tab => tab.path === route.fullPath)) {
                this.tabsList.push({
                    path: route.fullPath,
                    name: route?.name as string,
                    title: route.meta.title as string,
                })
                this.cacheView.push(route.name as string)
            }
            this.activeKey = route.fullPath
        },
        removeTab(path: string) {
            const index = this.tabsList.findIndex(tab => tab.path === path)
            if (index !== -1) {
                this.tabsList.splice(index, 1)
                // 如果关闭的是当前页
                if (this.activeKey === path) {
                    const nextTab = this.tabsList[index] || this.tabsList[index - 1]
                    this.activeKey = nextTab?.path || '/index'
                }
            }
        },
        /**点击标签页的下拉菜单 */
        dropdownMenuClick(event: { key: string }, item: TabItem, router: Router) {
            switch (event.key) {
                case "refresh": {
                    const { name, path } = item
                    console.log("🚀 ~ name:", name)
                    // 标记为需要刷新
                    this.refreshFlags[name] = true
                    // 从缓存中移除该组件
                    this.cacheView = this.cacheView.filter(view => view !== name)
                    if (this.activeKey !== path) {
                        this.activeKey = path
                        router.push({ path })
                    }

                    // 等待视图更新后重置keep-alive的缓存key
                    nextTick(() => {
                        this.refreshFlags[name] = false
                        this.inserCacheView(name)
                    })
                    break
                }
            }
        },
        inserCacheView(name: string) {
            console.log("🚀 ~ name:", name)
            if (!this.cacheView.includes(name)) {
                this.cacheView.push(name)
            }
        }
    },
    persist: true
})

export default useRouteStore