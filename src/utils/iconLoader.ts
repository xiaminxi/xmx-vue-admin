import * as AntIcons from '@ant-design/icons-vue'
import { h } from 'vue'

const resolveIcon = (iconName?: string) => {
    if (!iconName) return undefined

    const antIcon = (AntIcons as Record<string, any>)[iconName]
    if (antIcon) return h(antIcon)

    // try {
    //     const data = await (() => import(`@/assets/icons/svg/${iconName}.svg`))()
    //     return 123
    //     // return h(AsyncSvgIcon)
    // } catch (e) {
    //     console.warn(`[resolveIcon] 未找到图标组件: ${iconName}`)
    //     return undefined
    // }
}

export default resolveIcon