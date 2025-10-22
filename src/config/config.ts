interface HttpServiceConfig {
  baseUrl: string
  proxyPrefix: string
}

interface HttpConfig {
  [key: string]: HttpServiceConfig
}

export const httpConfig: HttpConfig = {
  manage: {
    baseUrl: 'http://localhost:3000',
    proxyPrefix: '/manage',
  }
}


export const appConfig = {
  /**网站水印 */
  watermark: "XMX-adminse",
  /**token key */
  tokenKey: "XMX",
  /** 网站名称 */
  websiteName: "XMX",
  /** 当前版本 */
  version: "1.0.0",
  /** 默认语言 */
  defaultLanguage: "zh-CN",
  /**路由白名单 */
  whiteList: [
    "/login",
    "/register"
  ]
}