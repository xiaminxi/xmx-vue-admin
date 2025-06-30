// utils/request.ts
import { httpConfig } from '@/config/config'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

// 扩展 AxiosRequestConfig，加入 cancelKey
export interface CustomAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
    /** 用于取消请求的唯一标识 */
    cancelKey?: string
}

// 所有请求的取消控制器
const abortControllerMap = new Map<string, AbortController>()

// 创建 axios 实例
const service: AxiosInstance = axios.create({
    baseURL: httpConfig.manage.proxyPrefix,
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(config => {
    console.log("🚀 ~ config:", config)

    const customConfig = config as CustomAxiosRequestConfig

    // 如果设置了 cancelKey，先取消已有的同名请求
    if (customConfig.cancelKey) {
        const existing = abortControllerMap.get(customConfig.cancelKey)
        if (existing) {
            existing.abort()
            abortControllerMap.delete(customConfig.cancelKey)
        }

        const controller = new AbortController()
        customConfig.signal = controller.signal
        abortControllerMap.set(customConfig.cancelKey, controller)
    }

    return customConfig
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const config = response.config as CustomAxiosRequestConfig
        if (config.cancelKey) {
            abortControllerMap.delete(config.cancelKey)
        }
        return response.data
    },
    (error) => {
        const config = error.config as CustomAxiosRequestConfig
        if (config?.cancelKey) {
            abortControllerMap.delete(config.cancelKey)
        }
        if (axios.isCancel?.(error)) {
            return Promise.resolve({ __cancelled__: true })
        }
        return Promise.reject(error)
    }
)

// 封装请求方法
export const request = <T = any>(config: CustomAxiosRequestConfig): Promise<T> => {
    return service(config)
}

// 取消指定请求
export const cancelRequest = (cancelKey: string) => {
    const controller = abortControllerMap.get(cancelKey)
    if (controller) {
        controller.abort()
        abortControllerMap.delete(cancelKey)
    }
}

// 取消所有请求
export const cancelAllRequests = () => {
    abortControllerMap.forEach(controller => controller.abort())
    abortControllerMap.clear()
}


export default service