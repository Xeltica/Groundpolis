<template>
<x-code :code="code" :lang="lang" :inline="inline"/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
	components: {
		XCode: () => import('./code-core.vue').then(m => m.default),
	},
})
export default class Code extends Vue {
	@Prop() private readonly code!: string;
	@Prop() private readonly lang: string;
	@Prop() private readonly inline: boolean;
}
</script>
