<template>
<div>
	<div>{{ script.interpolate(value.title) }}</div>
	<ui-radio v-for="x in value.values" v-model="v" :value="x" :key="x">{{ x }}</ui-radio>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class XRadioButton extends Vue {
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
