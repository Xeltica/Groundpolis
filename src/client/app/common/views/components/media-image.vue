<template>
<div class="qjewsnkgzzxlxtzncydssfbgjibiehcy" v-if="image.isSensitive && hide && !$store.state.device.alwaysShowNsfw" @click="hide = false">
	<div>
		<b><fa icon="exclamation-triangle"/> {{ $t('sensitive') }}</b>
		<span>{{ $t('click-to-show') }}</span>
	</div>
</div>
<a class="gqnyydlzavusgskkfvwvjiattxdzsqlf" v-else
	:href="image.url"
	:style="style"
	:title="image.name"
	@click.prevent="onClick"
>
	<div class="gif" v-if="image.type === 'image/gif'">GIF</div>
	<div class="nsfwclose" v-if="image.isSensitive && !hide" @click.stop.prevent="hide = true"><fa icon="times"/></div>
</a>
</template>

<script lang="ts">
import Vue from 'vue';
import i18n from '../../../i18n';
import ImageViewer from './image-viewer.vue';
import { getStaticImageUrl } from '../../../common/scripts/get-static-image-url';

export default Vue.extend({
	i18n: i18n('common/views/components/media-image.vue'),
	props: {
		image: {
			type: Object,
			required: true
		},
		raw: {
			default: false
		}
	},
	data() {
		return {
			hide: true
		};
	},
	computed: {
		style(): any {
			let url = `url(${
				this.$store.state.device.disableShowingAnimatedImages
					? getStaticImageUrl(this.image.thumbnailUrl)
					: this.image.thumbnailUrl
			})`;

			if (this.$store.state.device.loadRemoteMedia || this.$store.state.device.lightmode) {
				url = null;
			} else if (this.raw || this.$store.state.device.loadRawImages) {
				url = `url(${this.image.url})`;
			}

			return {
				'background-color': this.image.properties.avgColor || 'transparent',
				'background-image': url
			};
		}
	},
	methods: {
		onClick() {
			const viewer = this.$root.new(ImageViewer, {
				image: this.image
			});
			this.$once('hook:beforeDestroy', () => {
				viewer.close();
			});
		}
	}
});
</script>

<style lang="stylus" scoped>
.gqnyydlzavusgskkfvwvjiattxdzsqlf
	display block
	cursor zoom-in
	overflow hidden
	width 100%
	height 100%
	background-position center
	background-size contain
	background-repeat no-repeat

	> .gif
		background-color var(--text)
		border-radius 6px
		color var(--secondary)
		display inline-block
		font-size 14px
		font-weight bold
		left 12px
		opacity .5
		padding 0 6px
		text-align center
		top 12px
		pointer-events none

	> .nsfwclose
		background-color var(--text)
		border-radius 12px
		color var(--secondary)
		display inline-block
		font-size 14px
		font-weight bold
		right 24px
		top 12px
		width 24px
		height 24px
		display flex
		align-items center
		justify-content center
		opacity 0.5
		text-align center
		position absolute
		cursor pointer

.qjewsnkgzzxlxtzncydssfbgjibiehcy
	display flex
	justify-content center
	align-items center
	background #111
	color #fff

	> div
		display table-cell
		text-align center
		font-size 12px

		> *
			display block

</style>
