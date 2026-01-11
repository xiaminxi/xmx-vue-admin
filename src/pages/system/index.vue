<template>
    <div>
        qweqwer
        <ActiveHome :index="1000" />
        <a-button @click="startRequest">开始请求</a-button>
        <a-button @click="stopRequest">停止请求</a-button>
        <a-button @click="clickRequest">点击请求</a-button>
    </div>
</template>

<script lang="ts" setup>
    import { getList, insertMenu } from '@/service/api';
    import ActiveHome from './components/ActiveHome';
    import { onMounted } from 'vue';
    defineOptions({ name: "Menu" })

    const getTableData = () => {
        getList({ pageSize: 10, pageNum: 1 }).then(res => {
            console.log("🚀 ~ getTableData ~ res:", res)

        }).catch(err => {
            console.log("🚀 ~ getTableData ~ err:", err)
        })

    }

    getTableData()
    getTableData()


    let timer: NodeJS.Timeout | null = null
    const startRequest = () => {
        if (timer) {
            clearInterval(timer)
            return
        }
        timer = setInterval(() => {
            getTableData()
        }, 0)
    }

    const stopRequest = () => {
        clearInterval(timer!)
    }

    const clickRequest = () => {
        getTableData()
    }

    onMounted(() => {
        console.log(1231223)
    })
</script>

<style lang="scss" scoped></style>