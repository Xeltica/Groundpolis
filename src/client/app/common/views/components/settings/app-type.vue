<template>
<ui-card>
	<template #title><fa :icon="faMobileAlt"/> {{ $t('title') }}</template>

	<section class="fit-top">
		<p>{{ $t('intro') }}</p>
		<ui-select v-model="appTypeForce" :placeholder="$t('intro')">
			<option v-for="x in ['auto', 'desktop', 'mobile']" :value="x" :key="x">{{ $t(`choices.${x}`) }}</option>
		</ui-select>
		<ui-info warn>{{ $t('info') }}</ui-info>
	</section>
</ui-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import i18n from '../../../../i18n';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'

@Component({
	i18n: i18n('common/views/components/settings/app-type.vue'),
})
export default class AppType extends Vue {

	private faMobileAlt = faMobileAlt;

	public get appTypeForce() {
		return this.$store.state.device.appTypeForce;
	}

	public set appTypeForce(value) {
		this.$store.commit('device/set', { key: 'appTypeForce', value });
		this.reload();
	}

	public reload() {
		this.$root.dialog({
			type: 'warning',
			text: this.$t('@.reload-to-apply-the-setting'),
			showCancelButton: true
		}).then(({ canceled }) => {
			if (!canceled) {
				location.reload();
			}
		});
	}
}
</script>
