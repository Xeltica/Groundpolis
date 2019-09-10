<template>
<div>
	<ui-button class="llumlmnx" @click="click()">{{ script.interpolate(value.text) }}</ui-button>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class XCounter extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly script;

	private v = 0;

	@Watch('v')
	public watchV() {
		this.script.aiScript.updatePageVar(this.value.name, this.v);
		this.script.eval();
	}

	public click() {
		this.v = this.v + (this.value.inc || 1);
	}
}
</script>

<style lang="stylus" scoped>
.llumlmnx
	display inline-block
	min-width 300px
	max-width 450px
	margin 8px 0
</style>
