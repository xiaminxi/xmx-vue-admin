import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router/index'
import 'ant-design-vue/dist/reset.css'
import * as Pinia from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'
import "./router/routerInterceptor"

const app = createApp(App)
const store = Pinia.createPinia()
store.use(createPersistedState({
    storage: localStorage
}))


app.use(router)
    .use(Antd)
    .use(store)
    .mount('#app')
