import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        /**是否隐藏菜单 */
        visible?: boolean
        /**菜单图标 */
        icon?: string
        /**是否缓存页面 */
        keepAlive?: boolean
        /**标题 */
        title?: string
    }
}
