import { defineStore } from "pinia";

const useConfigStore = defineStore("useConfigStore", {
    state: () => {
        return {
            userInfo: {
                token: null
            }
        }
    },
    getters: {
        /**用户是否登录 */
        isLogin(state) {
            return state.userInfo.token ? true : false
        }
    },
    actions: {

    },
    persist: true
})

export default useConfigStore