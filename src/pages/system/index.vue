<template>
    <div>
        qweqwer
        <ActiveHome :index="1000" />
    </div>
</template>

<script lang="ts" setup>
    import { getList } from '@/service/api';
    import ActiveHome from './components/ActiveHome';
    import { onMounted } from 'vue';
    defineOptions({ name: "Menu" })


    getList().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

    onMounted(() => {
        console.log(1231223)
    })
</script>

<style lang="scss" scoped></style>