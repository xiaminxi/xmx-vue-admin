<template>
	<div>
		<div v-for="(item, index) in children" :key="index">{{ item }}</div>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	children: string[]
}
const props = withDefaults(defineProps<Props>(), {

})
</script>

<style lang="scss" scoped></style>