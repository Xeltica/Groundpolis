<template>
<div class="ui-input" :class="[{ focused, filled, _inline, disabled }, styl]">
	<div class="icon" ref="icon"><slot name="icon"></slot></div>
	<div class="input">
		<div class="password-meter" v-if="withPasswordMeter" v-show="passwordStrength != ''" :data-strength="passwordStrength">
			<div class="value" ref="passwordMetar"></div>
		</div>
		<span class="label" ref="label"><slot></slot></span>
		<span class="title" ref="title"><slot name="title"></slot></span>
		<div class="prefix" ref="prefix"><slot name="prefix"></slot></div>
		<template v-if="type != 'file'">
			<input v-if="debounce" ref="input"
				v-debounce="500"
				:type="type"
				v-model.lazy="v"
				:disabled="disabled"
				:required="required"
				:readonly="readonly"
				:placeholder="placeholder"
				:pattern="pattern"
				:autocomplete="autocomplete"
				:spellcheck="spellcheck"
				@focus="focused = true"
				@blur="focused = false"
				@keydown="$emit('keydown', $event)"
				@change="$emit('change', $event)"
				:list="id"
			>
			<input v-else ref="input"
				:type="type"
				v-model="v"
				:disabled="disabled"
				:required="required"
				:readonly="readonly"
				:placeholder="placeholder"
				:pattern="pattern"
				:autocomplete="autocomplete"
				:spellcheck="spellcheck"
				@focus="focused = true"
				@blur="focused = false"
				@keydown="$emit('keydown', $event)"
				@change="$emit('change', $event)"
				:list="id"
			>
			<datalist :id="id" v-if="datalist">
				<option v-for="(data, i) in datalist" :value="data" :key="i"/>
			</datalist>
		</template>
		<template v-else>
			<input ref="input"
				type="text"
				:value="filePlaceholder"
				readonly
				@click="chooseFile"
			>
			<input ref="file"
				type="file"
				:value="value"
				@change="onChangeFile"
			>
		</template>
		<div class="suffix" ref="suffix"><slot name="suffix"></slot></div>
	</div>
	<div class="toggle" v-if="withPasswordToggle">
		<a @click="togglePassword">
			<span v-if="type == 'password'"><fa :icon="['fa', 'eye']"/> {{ $t('@.show-password') }}</span>
			<span v-if="type != 'password'"><fa :icon="['far', 'eye-slash']"/> {{ $t('@.hide-password') }}</span>
		</a>
	</div>
	<div class="desc"><slot name="desc"></slot></div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop, Watch, Ref } from 'vue-property-decorator';
import debounce from 'v-debounce';
const getPasswordStrength = require('syuilo-password-strength');

@Component({
	directives: {
		debounce
	},
})
export default class Input extends Vue {
	@Inject({ default: false }) private horizonGrouped: boolean;
	@Prop() private value;
	@Prop() private type: string;
	@Prop() private required: boolean;
	@Prop() private readonly: boolean;
	@Prop() private disabled: boolean;
	@Prop() private pattern: string;
	@Prop() private placeholder: string;
	@Prop({ default: false }) private autofocus: boolean;
	@Prop() private autocomplete;
	@Prop() private spellcheck;
	@Prop() private debounce;
	@Prop({ default: false }) private withPasswordMeter: boolean;
	@Prop({ default: false }) private withPasswordToggle: boolean;
	@Prop() private datalist: any[];
	@Prop({ default: null }) private inline: boolean | null;
	@Prop({ default: 'line' }) private styl: string;

	@Ref() private passwordMetar: HTMLElement;
	@Ref() private icon: HTMLElement;
	@Ref() private label: HTMLElement;
	@Ref() private title: HTMLElement;
	@Ref() private prefix: HTMLElement;
	@Ref() private input: HTMLElement;
	@Ref() private file: HTMLElement;
	@Ref() private suffix: HTMLElement;

	private v = this.value;
	private focused = false;
	private passwordStrength = '';
	private id = Math.random().toString();

	public get _inline() {
		return this.inline === null ? this.horizonGrouped : this.inline;
	}

	public get filled() {
		return this.v != '' && this.v != null;
	}

	public get filePlaceholder(): string | null {
		if (this.type != 'file') return null;
		if (this.v == null) return null;

		if (typeof this.v == 'string') return this.v;

		if (Array.isArray(this.v)) {
			return this.v.map(file => file.name).join(', ');
		} else {
			return this.v.name;
		}
	}

	@Watch('value')
	public watchValue(v) {
		this.v = v;
	}

	@Watch('v')
	public watchV(v) {
		if (this.type === 'number') {
			this.$emit('input', parseInt(v, 10));
		} else {
			this.$emit('input', v);
		}

		if (this.withPasswordMeter) {
			if (v == '') {
				this.passwordStrength = '';
				return;
			}

			const strength = getPasswordStrength(v);
			this.passwordStrength = strength > 0.7 ? 'high' : strength > 0.3 ? 'medium' : 'low';
			(this.passwordMetar as any).style.width = `${strength * 100}%`;
		}
	}

	public mounted() {
		if (this.autofocus) {
			this.$nextTick(() => {
				this.input.focus();
			});
		}

		this.$nextTick(() => {
			// このコンポーネントが作成された時、非表示状態である場合がある
			// 非表示状態だと要素の幅などは0になってしまうので、定期的に計算する
			const clock = setInterval(() => {
				if (this.prefix) {
					this.label.style.left = (this.prefix.offsetLeft + this.prefix.offsetWidth) + 'px';
					if (this.prefix.offsetWidth) {
						this.input.style.paddingLeft = this.prefix.offsetWidth + 'px';
					}
				}
				if (this.suffix) {
					if (this.suffix.offsetWidth) {
						this.input.style.paddingRight = this.suffix.offsetWidth + 'px';
					}
				}
			}, 100);

			this.$once('hook:beforeDestroy', () => {
				clearInterval(clock);
			});
		});

		this.$on('keydown', (e: KeyboardEvent) => {
			if (e.code == 'Enter') {
				this.$emit('enter');
			}
		});
	}

	public focus() {
		this.input.focus();
	}

	public togglePassword() {
		if (this.type == 'password') {
			this.type = 'text';
		} else {
			this.type = 'password';
		}
	}

	public chooseFile() {
		this.file.click();
	}

	public onChangeFile() {
		this.v = Array.from((this.file as any).files);
		this.$emit('input', this.v);
		this.$emit('change', this.v);
	}
}
</script>

<style lang="stylus" scoped>
root(fill)
	margin 32px 0

	> .icon
		position absolute
		top 0
		left 0
		width 24px
		text-align center
		line-height 32px
		color var(--inputLabel)

		&:not(:empty) + .input
			margin-left 28px

	> .input

		if !fill
			&:before
				content ''
				display block
				position absolute
				bottom 0
				left 0
				right 0
				height 1px
				background var(--inputBorder)

			&:after
				content ''
				display block
				position absolute
				bottom 0
				left 0
				right 0
				height 2px
				background var(--primary)
				opacity 0
				transform scaleX(0.12)
				transition border 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)
				will-change border opacity transform

		> .password-meter
			position absolute
			top 0
			left 0
			width 100%
			height 100%
			border-radius 6px
			overflow hidden
			opacity 0.3

			&[data-strength='']
				display none

			&[data-strength='low']
				> .value
					background #d73612

			&[data-strength='medium']
				> .value
					background #d7ca12

			&[data-strength='high']
				> .value
					background #61bb22

			> .value
				display block
				width 0
				height 100%
				background transparent
				border-radius 6px
				transition all 0.1s ease

		> .label
			position absolute
			z-index 1
			top fill ? 6px : 0
			left 0
			pointer-events none
			transition 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)
			transition-duration 0.3s
			font-size 16px
			line-height 32px
			color var(--inputLabel)
			pointer-events none
			//will-change transform
			transform-origin top left
			transform scale(1)

		> .title
			position absolute
			z-index 1
			top fill ? -24px : -17px
			left 0 !important
			pointer-events none
			font-size 16px
			line-height 32px
			color var(--inputLabel)
			pointer-events none
			//will-change transform
			transform-origin top left
			transform scale(.75)

		> input
			display block
			width 100%
			margin 0
			padding 0
			font inherit
			font-weight fill ? bold : normal
			font-size 16px
			line-height 32px
			color var(--inputText)
			background transparent
			border none
			border-radius 0
			outline none
			box-shadow none

			if fill
				padding 6px 12px
				background rgba(#000, 0.035)
				border-radius 6px

			&[type='file']
				display none

		> .prefix
		> .suffix
			display block
			position absolute
			z-index 1
			top 0
			font-size 16px
			line-height fill ? 44px : 32px
			color var(--inputLabel)
			pointer-events none

			&:empty
				display none

			> *
				display inline-block
				min-width 16px
				max-width 150px
				overflow hidden
				white-space nowrap
				text-overflow ellipsis

		> .prefix
			left 0
			padding-right 4px

			if fill
				padding-left 12px

		> .suffix
			right 0
			padding-left 4px

			if fill
				padding-right 12px

	> .toggle
		cursor pointer
		padding-left 0.5em
		font-size 0.7em
		opacity 0.7
		text-align left

		> a
			color var(--inputLabel)
			text-decoration none

	> .desc
		margin 6px 0
		font-size 13px

		&:empty
			display none

		*
			margin 0

	&.focused
		> .input
			if fill
				background rgba(#000, 0.05)
			else
				&:after
					opacity 1
					transform scaleX(1)

			> .label
				color var(--primary)

	&.focused
	&.filled
		> .input
			> .label
				top fill ? -24px : -17px
				left 0 !important
				transform scale(0.75)

.ui-input
	&.fill
		root(true)
	&:not(.fill)
		root(false)

	&.inline
		display inline-block
		margin 0

	&.disabled
		opacity 0.7

		&, *
			cursor not-allowed !important

</style>
