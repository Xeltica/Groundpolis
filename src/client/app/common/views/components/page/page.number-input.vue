<template>
<div>
	<ui-input class="kudkigyw" v-model="v" type="number">{{ script.interpolate(value.text) }}</ui-input>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class XNumberInput extends Vue {
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
.kudkigyw
	display inline-block
	min-width 300px
	max-width 450px
	margin 8px 0
</style>
