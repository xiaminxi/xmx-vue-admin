// utils/request.ts
import axios, {
    AxiosError,
    type Method,
    type AxiosInstance,
    type AxiosResponse,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from 'axios'
import { httpConfig } from '@/config/config'

/** 扩展请求配置 */
type RequestConfig = AxiosRequestConfig & {
    method: Method
}

/** 请求内部扩展字段 */
interface RequestMeta {
    requestKey?: string
    timerKey?: string
}

/** 请求取消控制器池 */
const abortControllerMap = new Map<string, Set<AbortController>>()

/** 创建 axios 实例 */
const request: AxiosInstance = axios.create({
    baseURL: httpConfig.manage.proxyPrefix,
    timeout: 10000
})

/** 生成稳定请求 key */
const createRequestKey = (config: AxiosRequestConfig): string => {
    const { method, url, params, data } = config

    const payload = method?.toUpperCase() === 'GET' ? data ?? {} : params ?? {}

    const entries = Object.entries(payload).sort(([a], [b]) => a.localeCompare(b))

    const query = entries.map(([key, value]) => `${key}=${JSON.stringify(value)}`).join('&')

    return `${method}:${url}:${query}`
}

/** 请求拦截器 */
request.interceptors.request.use((config: InternalAxiosRequestConfig & RequestMeta) => {
    /** ========= 请求去重 & 取消开始 ========= */
    const requestKey = createRequestKey(config)
    config.timerKey = `${new Date().getTime()}`
    config.requestKey = requestKey

    const controllers = abortControllerMap.get(requestKey)
    if (controllers) {
        controllers.forEach(c => c.abort('请求被取消'))
        controllers.clear()
    }

    const controller = new AbortController()
    config.signal = controller.signal

    if (!abortControllerMap.has(requestKey)) {
        abortControllerMap.set(requestKey, new Set())
    }
    abortControllerMap.get(requestKey)!.add(controller)
    /** ========= 请求去重 & 取消结束 ========= */


    /** ========= headers ========= */
    config.headers.set('Content-Type', 'application/json;charset=UTF-8')

    const token = localStorage.getItem('token')
    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
},
    error => Promise.reject(error)
)

/** 响应拦截器 */
request.interceptors.response.use(
    (response: AxiosResponse & { config: RequestMeta }) => {
        /** 结束计时 */
        console.log("🚀 ~ response.time:", new Date().getTime() - Number(response.config.timerKey))

        /** 清理取消控制器 */
        const requestKey = response.config.requestKey
        if (requestKey) {
            const controllers = abortControllerMap.get(requestKey)
            controllers?.clear()
            abortControllerMap.delete(requestKey)
        }


        console.log("🚀 ~ response:", response)
        return response.data
    },
    (error: AxiosError & { config?: RequestMeta }) => {
        /** 结束计时（包括 cancel） */
        const timerKey = error.config?.timerKey
        if (timerKey) {
            console.timeEnd(timerKey)
        }

        /** 清理取消控制器 */
        const requestKey = error.config?.requestKey
        if (requestKey) {
            const controllers = abortControllerMap.get(requestKey)
            controllers?.clear()
            abortControllerMap.delete(requestKey)
        }
        console.log("🚀 ~ abortControllerMap:", abortControllerMap)


        /** 可在此区分 cancel */
        if (error.code === 'ERR_CANCELED') {
            return Promise.reject({ message: '请求已取消', code: error.code })
        }

        return Promise.reject(error)
    }
)

/** 对外请求方法 */
const axiosRequest = <T = any>(config: RequestConfig): Promise<T> => request(config)

export default axiosRequest
