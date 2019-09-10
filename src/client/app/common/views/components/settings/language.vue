<template>
<ui-card>
	<template #title><fa icon="language"/> {{ $t('title') }}</template>

	<section class="fit-top">
		<ui-select v-model="lang" :placeholder="$t('pick-language')">
			<optgroup :label="$t('recommended')">
				<option value="">{{ $t('auto') }}</option>
			</optgroup>

			<optgroup :label="$t('specify-language')">
				<option v-for="x in langs" :value="x[0]" :key="x[0]">{{ x[1] }}</option>
			</optgroup>
		</ui-select>
		<ui-info>Current: <i>{{ currentLanguage }}</i></ui-info>
		<ui-info warn>{{ $t('info') }}</ui-info>
	</section>
</ui-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import i18n from '../../../../i18n';
import { langs } from '../../../../config';

@Component({
	i18n: i18n('common/views/components/language-settings.vue'),
})
export default class Language extends Vue {

	private langs = langs;
	private currentLanguage = 'Unknown';

	public get lang() { return this.$store.state.device.lang; }
	public set lang(value) { this.$store.commit('device/set', { key: 'lang', value }); }

	public created() {
		try {
			const locale = JSON.parse(localStorage.getItem('locale') || "{}");
			const localeKey = localStorage.getItem('localeKey');
			this.currentLanguage = `${locale.meta.lang} (${localeKey})`;
		} catch { }
	}
}
</script>
