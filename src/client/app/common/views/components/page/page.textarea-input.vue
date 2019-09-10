<template>
<div>
	<ui-textarea class="" v-model="v">{{ script.interpolate(value.text) }}</ui-textarea>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class XTextareaInput extends Vue {
	props: {
		value: {
			required: true
		},
		script: {
			required: true
		}
	},

	data() {
		return {
			v: this.value.default,
		};
	},

	watch: {
		v() {
			this.script.aiScript.updatePageVar(this.value.name, this.v);
			this.script.eval();
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
