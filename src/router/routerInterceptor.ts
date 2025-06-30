import { appConfig } from "@/config/config"
import router from "./index"
import useLoginStore from "@/modules/useLoginStore"
router.beforeEach((to, from, next) => {
    if (useLoginStore().isLogin) {

    } else {
        if (appConfig.whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            if(global.meta)
            next(`/login?redirect=${to.fullPath}`)
        }
    }
})

router.afterEach((to) => {
    if (to.meta.title) {
        document.title = `${to.meta.title} - ${appConfig.websiteName}`
    } else {
        document.title = '默认标题'
    }
})