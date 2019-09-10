<template>
<div class="vnxwkwuf" :class="{ inputs, noGrow }" :data-children-count="children">
	<slot></slot>
</div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop } from 'vue-property-decorator';
@Component
export default class Vm extends Vue {
	@Provide() private horizonGrouped = true;
	@Prop({ default: false }) private inputs: boolean;
	@Prop({ default: false }) private noGrow: boolean;

	private children = 0;

	public mounted() {
		this.$nextTick(() => {
			if (this.$slots) {
				this.children = this.$slots.default!.length;
			}
		});
	}
}
</script>

<style lang="stylus" scoped>
.vnxwkwuf
	margin 16px 0

	&.inputs
		margin 32px 0

	&.fit-top
		margin-top 0

	&.fit-bottom
		margin-bottom 0

	&:not(.noGrow)
		display flex

		> *
			flex 1
			min-width 0 !important

	> *:not(:last-child)
		margin-right 16px !important

	&[data-children-count="3"]
		@media (max-width 600px)
			display block

			> *
				display block
				width 100% !important
				margin 16px 0 !important

				&:first-child
					margin-top 0 !important

				&:last-child
					margin-bottom 0 !important

</style>
