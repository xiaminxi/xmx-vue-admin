import { defineStore } from "pinia";

const useLoginStore = defineStore("useLoginStore", {
    state: () => {
        return {
            userInfo: {
                token: "41234"
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

export default useLoginStore