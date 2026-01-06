<template>
    <div>
        wer
        <a-input v-model="value"></a-input>
    </div>
</template>

<script lang="ts" setup name="Index">
    defineOptions({
        name: "Index"
    })
    const value = ref()
    onMounted(() => {
        console.log("首页")
    })
</script>

<style lang="scss" scoped></style>