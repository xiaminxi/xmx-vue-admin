import { defineStore } from "pinia";

const useConfigStore = defineStore("useConfigStore", {
    state: () => {
        return {
            collapsed: false
        }
    },
    actions: {
        /**折叠、展开菜单 */
        toggleMenu() {
            this.collapsed = !this.collapsed
        }
    },
    persist: true
})

export default useConfigStore