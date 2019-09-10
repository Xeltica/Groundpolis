<template>
<div class="lzyxtsnt">
	<img v-if="image" :src="image.url"/>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Vm extends Vue {
	@Prop() private readonly value;
	@Prop() private readonly page;

	private image;

	public created() {
		this.image = this.page.attachedFiles.find(x => x.id === this.value.fileId);
	}
}
</script>

<style lang="stylus" scoped>
.lzyxtsnt
	> img
		max-width 100%
</style>
