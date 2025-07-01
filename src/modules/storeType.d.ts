
interface TabItem {
    title: string
    path: string
    name: string
}
interface UseRouteStore {
    tabsList: TabItem[]
    activeKey: string
    cacheView: string[]
    refreshFlags: Record<string, Boolean>
}