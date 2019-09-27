<template>
<button class="nrvgflfuaxwgkxoynpnumyookecqrrvh" @click="toggle">
	<b>{{ value ? this.$t('hide') : this.$t('show') }}</b>
	<span v-if="!value">{{ this.label }}</span>
</button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import i18n from '../../../i18n';
import { length } from 'stringz';
import { concat } from '../../../../../prelude/array';

@Component({
	i18n: i18n('common/views/components/cw-button.vue'),
})
export default class CwButton extends Vue {

	@Prop() private readonly value!: boolean;
	@Prop() private readonly note;

	public get label(): string {
		return concat([
			this.note.text ? [this.$t('chars', { count: length(this.note.text) })] : [],
			this.note.files && this.note.files.length !== 0 ? [this.$t('files', { count: this.note.files.length }) ] : [],
			this.note.poll != null ? [this.$t('poll')] : []
		] as string[][]).join(' / ');
	}

	public toggle() {
		this.$emit('input', !this.value);
	}
}
</script>

<style lang="stylus" scoped>
.nrvgflfuaxwgkxoynpnumyookecqrrvh
	display inline-block
	padding 4px 8px
	font-size 0.7em
	color var(--cwButtonFg)
	background var(--cwButtonBg)
	border-radius 2px
	cursor pointer
	user-select none

	&:hover
		background var(--cwButtonHoverBg)

	> span
		margin-left 4px

		&:before
			content '('
		&:after
			content ')'

</style>
