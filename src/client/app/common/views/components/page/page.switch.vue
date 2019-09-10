<template>
<div class="hkcxmtwj">
	<ui-switch v-model="v">{{ script.interpolate(value.text) }}</ui-switch>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Vm extends Vue {
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
.hkcxmtwj
	display inline-block
	margin 16px auto

	& + .hkcxmtwj
		margin-left 16px

</style>
