<template>
<x-container @remove="() => $emit('remove')" :draggable="true">
	<template #header><fa :icon="faBolt"/> {{ $t('blocks.textareaInput') }}</template>

	<section style="padding: 0 16px 16px 16px;">
		<ui-input v-model="value.name"><template #prefix><fa :icon="faMagic"/></template><span>{{ $t('blocks._textareaInput.name') }}</span></ui-input>
		<ui-input v-model="value.text"><span>{{ $t('blocks._textareaInput.text') }}</span></ui-input>
		<ui-textarea v-model="value.default"><span>{{ $t('blocks._textareaInput.default') }}</span></ui-textarea>
	</section>
</x-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { faBolt, faMagic } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../../../../i18n';
import XContainer from '../page-editor.container.vue';

@Component
export default class Vm extends Vue {
	i18n: i18n('pages'),

	components: {
		XContainer
	},

	props: {
		value: {
			required: true
		},
	},

	data() {
		return {
			faBolt, faMagic
		};
	},

	created() {
		if (this.value.name == null) Vue.set(this.value, 'name', '');
	},
}
</script>
