<template>
<div class="mk-reactions-viewer" :class="{ isMe }">
	<x-reaction v-for="(count, reaction) in note.reactions" :reaction="reaction" :count="count" :is-initial="initialReactions.has(reaction)" :note="note" :key="reaction"/>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import XReaction from './reactions-viewer.reaction.vue';

@Component
export default class Vm extends Vue {
	components: {
		XReaction
	},
	data() {
		return {
			initialReactions: new Set(Object.keys(this.note.reactions))
		};
	},
	props: {
		note: {
			type: Object,
			required: true
		},
	},
	computed: {
		isMe(): boolean {
			return this.$store.getters.isSignedIn && this.$store.state.i.id === this.note.userId;
		},
	},
}
</script>

<style lang="stylus" scoped>
.mk-reactions-viewer
	margin: 4px -2px

	&:empty
		display none

	&.isMe
		> span
			cursor default !important

			&:hover
				background var(--reactionViewerButtonBg) !important
</style>
