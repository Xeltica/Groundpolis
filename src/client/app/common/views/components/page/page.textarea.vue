<template>
<ui-textarea class="" :value="text" readonly></ui-textarea>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Textarea extends Vue {
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
