import { ref } from 'vue'

export function useState<T>(initialValue?: T) {
    const state = ref<T | undefined>(initialValue)
    const setState = (value: T | ((prev: T) => T)) => {
        if (typeof value === 'function') {
            // 函数式更新（模仿 React）
            state.value = (value as (prev: T) => T)(state.value)
        } else {
            state.value = value
        }
    }
    return [state, setState] as const
}
