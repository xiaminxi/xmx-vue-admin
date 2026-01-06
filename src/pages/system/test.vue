<template>
    <div>
        <a-bttoon @click="navigeteto(1)" >路由1</a-bttoon>
        <a-bttoon >路由2</a-bttoon>
        <a-bttoon>路由3</a-bttoon>
    </div>
</template>

<script lang="ts" setup>
    const router= useRouter()
const navigeteto= (type:number)=>{
    router.push({
        path:"/"
    })
}
</script>

<style lang="scss" scoped></style>