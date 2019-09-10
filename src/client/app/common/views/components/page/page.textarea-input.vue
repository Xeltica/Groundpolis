<template>
<div>
	<ui-textarea class="" v-model="v">{{ script.interpolate(value.text) }}</ui-textarea>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class XTextareaInput extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly script;

	private v = this.value.default;

	@Watch('v')
	public watchV() {
		this.script.aiScript.updatePageVar(this.value.name, this.v);
		this.script.eval();
	}
}
</script>

<style lang="stylus" scoped>
</style>
