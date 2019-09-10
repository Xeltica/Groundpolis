<template>
<div class="ngbfujlo">
	<ui-textarea class="textarea" :value="text" readonly></ui-textarea>
	<ui-button primary @click="post()" :disabled="posting || posted">{{ posted ? $t('posted-from-post-form') : $t('post-from-post-form') }}</ui-button>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import i18n from '../../../../i18n';

@Component({
	i18n: i18n('pages'),
})
export default class XPost extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly script;

	private text = this.script.interpolate(this.value.text);
	private posted = false;
	private posting = false;

	public created() {
		this.$watch('script.vars', () => {
			this.text = this.script.interpolate(this.value.text);
		}, { deep: true });
	}

	public post() {
		this.posting = true;
		this.$root.api('notes/create', {
			text: this.text,
		}).then(() => {
			this.posted = true;
			this.$root.dialog({
				type: 'success',
				splash: true
			});
		});
	}
}
</script>

<style lang="stylus" scoped>
.ngbfujlo
	padding 0 32px 32px 32px
	border solid 2px var(--pageBlockBorder)
	border-radius 6px

	@media (max-width 600px)
		padding 0 16px 16px 16px

		> .textarea
			margin-top 16px
			margin-bottom 16px

</style>
