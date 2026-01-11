<template>
    <div style="padding: 0 20px;">
        <div ref="scrollContainer" class="scroll-container">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useEventListener } from '@vueuse/core'



    const props = defineProps<{ activeKey: string | null }>()

    const scrollContainer = useTemplateRef("scrollContainer")

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    // 鼠标滚轮横向滚动
    useEventListener(scrollContainer, 'wheel', (e: WheelEvent) => {
        e.preventDefault()
        scrollContainer.value!.scrollLeft += e.deltaY * 2
    }, { passive: false })

    // 鼠标拖动滚动
    useEventListener(scrollContainer, 'mousedown', (e: MouseEvent) => {
        isDown = true
        scrollContainer.value!.classList.add('dragging')
        startX = e.pageX - scrollContainer.value!.offsetLeft
        scrollLeft = scrollContainer.value!.scrollLeft
    })

    useEventListener(window, 'mouseup', () => {
        isDown = false
        scrollContainer.value?.classList.remove('dragging')
    })

    useEventListener(window, 'mousemove', (e: MouseEvent) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - scrollContainer.value!.offsetLeft
        const walk = (x - startX)
        scrollContainer.value!.scrollLeft = scrollLeft - walk
    })

    // 监听 activeKey，自动滚动到中间
    watch(() => props.activeKey, async (key) => {
        await nextTick()
        const container = scrollContainer.value
        if (!container) return

        const target = container.querySelector(`[data-key="${key}"]`) as HTMLElement
        if (!target) return

        const scrollLeft = target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2)
        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        })
    })
</script>

<style scoped>
    .scroll-container {
        display: flex;
        gap: 5px;
        overflow-x: auto;
        user-select: none;
        cursor: grab;
        overflow-x: auto;
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */

        &::-webkit-scrollbar {
            display: none;
            /* Chrome, Safari, Opera */
        }
    }

    .scroll-container.dragging {
        cursor: grabbing;
    }
</style>
