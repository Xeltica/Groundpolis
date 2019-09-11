<template>
	<span class="mk-avatar" :style="style" :class="{ cat }" :title="user | acct" v-if="showImageOnClick" @click="showImage" v-once>
		<span class="inner" :style="icon"></span>
	</span>
	<span class="mk-avatar" :style="style" :class="{ cat }" :title="user | acct" v-else-if="disableLink && !disablePreview" v-user-preview="user.id" @click="onClick" v-once>
		<span class="inner" :style="icon"></span>
	</span>
	<span class="mk-avatar" :style="style" :class="{ cat }" :title="user | acct" v-else-if="disableLink && disablePreview" @click="onClick" v-once>
		<span class="inner" :style="icon"></span>
	</span>
	<router-link class="mk-avatar" :style="style" :class="{ cat }" :to="user | userPage" :title="user | acct" :target="target" v-else-if="!disableLink && !disablePreview" v-user-preview="user.id" v-once>
		<span class="inner" :style="icon"></span>
	</router-link>
	<router-link class="mk-avatar" :style="style" :class="{ cat }" :to="user | userPage" :title="user | acct" :target="target" v-else-if="!disableLink && disablePreview" v-once>
		<span class="inner" :style="icon"></span>
	</router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getStaticImageUrl } from '../../../common/scripts/get-static-image-url';
import ImageViewer from './image-viewer.vue';
import { User } from '../../../../../models/entities/user';

@Component
export default class Avatar extends Vue {
	@Prop() private user: User;
	@Prop({ default: null }) private target: string | null;
	@Prop({ default: false }) private disableLink: boolean;
	@Prop({ default: false }) private disablePreview: boolean;
	@Prop({ default: false }) private showImageOnClick: boolean;

		public get lightmode(): boolean {
			return this.$store.state.device.lightmode;
		}

		public get cat(): boolean {
			return this.user.isCat && this.$store.state.settings.circleIcons;
		}

		public get style(): any {
			return {
				borderRadius: this.$store.state.settings.circleIcons ? '100%' : null
			};
		}

		public get url(): string {
			return this.$store.state.device.disableShowingAnimatedImages
				? getStaticImageUrl(this.user.avatarUrl || '')
				: this.user.avatarUrl || '';
		}

		public get icon(): any {
			return {
				backgroundColor: this.user.avatarColor,
				backgroundImage: this.lightmode ? null : `url(${this.url})`,
				borderRadius: this.$store.state.settings.circleIcons ? '100%' : null
			};
		}
	public mounted() {
		if (this.user.avatarColor) {
			(this.$el as HTMLElement).style.color = this.user.avatarColor;
		}
	}

		public onClick(e) {
			this.$emit('click', e);
		}

		public showImage(e) {
			this.$emit('click', e);
			this.$root.new(ImageViewer, {
				image: {
					name: this.user.name || this.user.username,
					url: this.url
				}
			});
		}
}
</script>

<style lang="stylus" scoped>
.mk-avatar
	display inline-block
	vertical-align bottom
	flex-shrink 0

	&:not(.cat)
		overflow hidden
		border-radius 8px

	&.cat::before,
	&.cat::after
		background #df548f
		border solid 4px currentColor
		box-sizing border-box
		content ''
		display inline-block
		height 50%
		width 50%

	&.cat::before
		border-radius 0 75% 75%
		transform rotate(37.5deg) skew(30deg)

	&.cat::after
		border-radius 75% 0 75% 75%
		transform rotate(-37.5deg) skew(-30deg)

	.inner
		background-position center center
		background-size cover
		bottom 0
		left 0
		position absolute
		right 0
		top 0
		transition border-radius 1s ease
		z-index 1

</style>
