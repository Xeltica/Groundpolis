<template>
<x-prism :inline="inline" :language="prismLang">{{ code }}</x-prism>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import XPrism from 'vue-prism-component';

@Component({
	components: {
		XPrism
	},
})
export default class CodeCore extends Vue {
	@Prop() private readonly code!: string;
	@Prop() private readonly lang: string;
	@Prop() private readonly inline: boolean;

	public get prismLang() {
		return Prism.languages[this.lang] ? this.lang : 'js';
	}
}
</script>
