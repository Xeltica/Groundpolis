<template>
<div class="zdcrxcne">
	<slot></slot>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Vm extends Vue {}
</script>

<style lang="stylus" scoped>
.zdcrxcne
	margin 16px

</style>
