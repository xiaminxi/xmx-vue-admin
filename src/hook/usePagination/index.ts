import { ref, reactive, watch } from 'vue'

interface PaginationOptions {
    pageSize?: number
    params?: Record<string, any>
}

interface ApiResponse<T = any> {
    list: T[]
    total: number
}

// 泛型支持 T 表示数据类型
export function usePagination<T = any>(
    apiFn: (params: any) => Promise<ApiResponse<T>>,
    options: PaginationOptions = {}
) {
    const loading = ref(false)
    const dataSource = ref<T[]>([])
    const pagination = reactive({
        current: 1,
        pageSize: options.pageSize || 10,
        total: 0
    })

    const extraParams = reactive<Record<string, any>>({
        ...(options.params || {})
    })

    const fetchData = async () => {
        loading.value = true
        try {
            const res = await apiFn({
                pageNum: pagination.current,
                pageSize: pagination.pageSize,
                ...extraParams
            })
            dataSource.value = res.list
            pagination.total = res.total
        } finally {
            loading.value = false
        }
    }

    const resetPage = () => {
        pagination.current = 1
        fetchData()
    }

    // 如果分页发生变化时自动刷新
    watch(
        () => [pagination.current, pagination.pageSize],
        fetchData
    )

    return {
        loading,
        dataSource,
        pagination,
        fetchData,
        resetPage,
        extraParams
    }
}
