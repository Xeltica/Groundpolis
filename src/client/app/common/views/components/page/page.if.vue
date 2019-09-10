<template>
<div v-show="script.vars[value.var]">
	<x-block v-for="child in value.children" :value="child" :page="page" :script="script" :key="child.id" :h="h"/>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Vm extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly script;
	@Prop() private readonly page;
	@Prop() private readonly h;

	public beforeCreate() {
		this.$options.components.XBlock = require('./page.block.vue').default;
	}
}
</script>
