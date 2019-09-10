<template>
<section class="sdgxphyu">
	<component :is="'h' + h">{{ value.title }}</component>

	<div class="children">
		<x-block v-for="child in value.children" :value="child" :page="page" :script="script" :key="child.id" :h="h + 1"/>
	</div>
</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class XSection extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly script;
	@Prop() private readonly page;
	@Prop() private readonly h;

	public beforeCreate() {
		this.$options.components!.XBlock = require('./page.block.vue').default;
	}
}
</script>

<style lang="stylus" scoped>
.sdgxphyu
	margin 1.5em 0

	> h2
		font-size 1.35em
		margin 0 0 0.5em 0

	> h3
		font-size 1em
		margin 0 0 0.5em 0

	> h4
		font-size 1em
		margin 0 0 0.5em 0

	> .children
		//padding 16px

</style>
