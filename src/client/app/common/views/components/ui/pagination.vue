<template>
<div class="mwermpua" v-if="!fetching">
	<sequential-entrance animation="entranceFromTop" delay="25">
		<slot :items="items"></slot>
	</sequential-entrance>
	<div class="more" v-if="more">
		<ui-button @click="fetchMore()">{{ $t('@.load-more') }}</ui-button>
	</div>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import paging from '../../../scripts/paging';

@Component({
	mixins: [
		paging({
			captureWindowScroll: false,
		}),
	],
})
export default class Pagination extends Vue {
	@Prop() private pagination;
}
</script>

<style lang="stylus" scoped>
.mwermpua
	> .more
		margin-top 16px

</style>
