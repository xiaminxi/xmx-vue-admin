import { httpConfig } from "./config.ts"
import type { ProxyOptions } from 'vite'

/**
 * 返回用于 Vite 配置的 proxy 对象
 */
export const createProxy = (): Record<string, ProxyOptions> => {
	const proxyObj: Record<string, ProxyOptions> = {}

	for (const key in httpConfig) {
		if (Object.prototype.hasOwnProperty.call(httpConfig, key)) {
			const { proxyPrefix, baseUrl } = httpConfig[key]

			proxyObj[proxyPrefix] = {
				target: baseUrl,
				changeOrigin: true,
				rewrite: (path: string): string => {
					console.log(`[代理重写] ${path} -> ${path.replace(new RegExp(`^${proxyPrefix}`), '')}`)
					return path.replace(new RegExp(`^${proxyPrefix}`), '')
				}
			}
		}
	}

	return proxyObj
}
